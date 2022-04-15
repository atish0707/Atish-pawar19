

describe('datepicker', () => {
    it('datepicker', () => {

        let mm = new Date()
        mm.setDate(mm.getDate() - 500)
        let day = mm.getDate()
        let fullYear = mm.getFullYear()
        let month = mm.toLocaleDateString('Default', { month: "long" })
        cy.log(day)
        cy.log(month)
        cy.log(fullYear)

        cy.visit('https://webdriveruniversity.com/')
        cy.get('#datepicker').last().click()

        function callfn() {
            cy.get('.datepicker-switch').first().then((el) => {
                if (!el.text().includes(fullYear)) {
                    cy.get('.prev').eq(0).click()
                    callfn()
                }
            }).then(() => {

                cy.get('datepicker-switch').first().then((el) => {
                    if (!el.text().includes(month)) {
                        cy.get('.prev').eq(0).click()
                        callfn()
                    }
                })
            })
        }
        callfn()
        function calldate() {
            cy.get('.day').contains(day).click()

        }
        calldate()
    })
})