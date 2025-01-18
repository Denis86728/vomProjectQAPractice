export default class BasePage {
    navigateToApp(url){
        return cy.visit(url)
    }
}