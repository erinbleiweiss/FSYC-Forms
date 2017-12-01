import { AppPage } from './app.po';

describe('foundation-syc-forms App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to fsyc!');
  });
});
