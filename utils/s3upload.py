#!/usr/bin/env python2.7

import argparse
import boto3
import os
import readline
import shutil
import tempfile
from zipfile import ZipFile, ZIP_DEFLATED

FUNCTIONS_SOURCE_FOLDER = "backend/functions"
BUCKET_NAME = "fsyc-forms-lambda-code"

source_abs_path = os.path.join(os.getcwd(), FUNCTIONS_SOURCE_FOLDER)
lambda_file_names = []


# Tab complete based on files in source ('/lambda/') folder
def completer(text, state):
    results = [x for x in lambda_file_names if x.startswith(text)] + [None]
    return results[state]


# Zip all files in a directory to a destination directory (temp folder)
def zip_dir_to_temp(foldername, target_dir, destination):
    save_path = "{0}.zip".format(os.path.join(destination, foldername))
    zipobj = ZipFile(save_path, 'w', ZIP_DEFLATED)

    rootlen = len(target_dir) + 1
    for root, dirs, files in os.walk(target_dir):
        for file in files:
            filepath = os.path.join(root, file)
            zipobj.write(filepath, filepath[rootlen:])


# Zip a single file to a destination directory (temp folder`)
def zip_file_to_temp(file, destination):
    if file[-3:] == ".py":
        filename = file[:-3]
        save_path = "{0}.zip".format(os.path.join(destination, filename))
        zipobj = ZipFile(save_path, 'w', ZIP_DEFLATED)

        root = os.path.join(os.getcwd(), FUNCTIONS_SOURCE_FOLDER)
        filepath = os.path.join(root, file)
        zipobj.write(filepath, os.path.relpath(filepath, root))


# Zip all files from 'FUNCTIONS_SOURCE_FOLDER' to destination directory (temp folder)
def zip_files_from_source_dir(destination, select_files=None):
    for filename in os.listdir(source_abs_path):
        filepath = os.path.join(source_abs_path, filename)

        # If 'select_files' param is supplied, only upload files matching list
        if not select_files or filename in select_files:
            if os.path.isdir(filepath):
                zip_dir_to_temp(filename, filepath, destination)
            elif os.path.isfile(filepath):
                zip_file_to_temp(filename, destination)


if __name__ == '__main__':
    boto3.setup_default_session(profile_name='fsyc')
    s3 = boto3.resource('s3')

    # Set up argparse
    parser = argparse.ArgumentParser(description='Automatically sync files under the \'lambda/\' directory to AWS')
    parser.add_argument('--all', action='store_true', help='Upload all files in the \'lambda/\' directory')
    args = parser.parse_args()

    tmp_dir = tempfile.mkdtemp()

    if args.all:
        # Zip all files to tmp
        zip_files_from_source_dir(tmp_dir)
    else:
        # List all possible files
        for filepath in os.listdir(source_abs_path):
            filename = filepath.split(source_abs_path)[0]
            if filename[0] != ".":          # Exclude ".DS_Store", etc.
                lambda_file_names.append(filename)

        # Initialize tab complete
        readline.parse_and_bind("tab: complete")
        readline.set_completer(completer)

        functions_to_sync = []

        # Read files from user input
        print('List all files to sync to AWS (Press enter when done)\n')
        while True:
            file_input = input()
            if not file_input:
                break
            elif file_input in lambda_file_names and file_input not in functions_to_sync:
                functions_to_sync.append(file_input)

        # Zip indicated files to tmp
        zip_files_from_source_dir(tmp_dir, functions_to_sync)

    zips_to_upload = os.listdir(tmp_dir)
    num_files = len(zips_to_upload)

    # Upload all zip files from tmp to S3 bucket
    for idx, file in enumerate(zips_to_upload):
        if file[-4:] == ".zip":
            function_name = file[:-4]
            data = open(os.path.join(tmp_dir, file), 'rb')
            print("Uploading \"{0}\" to S3 Bucket ({1}/{2})".format(
                    file, idx+1, num_files))
            s3.Bucket(BUCKET_NAME).put_object(Key=file, Body=data)

    # Remove tmp dir
    shutil.rmtree(tmp_dir)
    print("\nSync Complete!")



