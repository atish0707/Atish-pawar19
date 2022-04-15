describe('verify the get request', () => {

    it('verify the GET user request', () => {
        cy.request({
            method: 'GET',
            url: "https://gorest.co.in/public/v2/users",
            headers: {
                Authorization: `Bearer 4682c7888368922069a06b7001ebf5a7e7d3c8ab7269669606c6491b6c0e87d9`
            }
        }).then(function (res) {
            let r = res.body.some(function (el) {
                return el.name.startsWith('G')
            })
            expect(r).to.eq(true)

        })

    })

    it('verify the GET request for post', () => {
        cy.request({
            method: 'GET',
            url: "https://gorest.co.in/public/v2/posts",
            headers: {
                Authorization: `Bearer 4682c7888368922069a06b7001ebf5a7e7d3c8ab7269669606c6491b6c0e87d9`
            }
        }).then(function (res) {

            expect(res.status).to.eq(200)
            res.body.forEach(element => {
                expect(element.body.length)
                    .to.be.gt(1)

            });
            // let r = res.body.some(function(el){
            //     return el.name.startsWith('G')
            // })
            // expect(r).to.eq(true)
        })

    })


    it('verify Create API for users', () => {
        cy.request({
            method: 'POST',
            url: "https://gorest.co.in/public/v2/users",
            headers: {
                Authorization: `Bearer 4682c7888368922069a06b7001ebf5a7e7d3c8ab7269669606c6491b6c0e87d9`
            },
            body: {
                name: "Tenali Ramakrishna",
                gender: "male",
                email: `tei.ramakrissa${Math.random() * 100}@15ce.com`,
                status: "active"
            }
        }).then(function (res) {
            expect(res.status).to.eql(201)
            expect(res.body).to.have.property('id')
            //cy.log(res

        })

    })

    //GET -//https://gorest.co.in/public/v2/users ==> take one single id

    //PUT - https://gorest.co.in/public/v2/users/2775 ===> payload(changes)

    // GET - https://gorest.co.in/public/v2/users/2775  ===? validate payload


    it.only('verify Create API for users', () => {

        let updateEmail = 'ram2@gmail.com'
        let id = ""
        cy.request({
            method: 'GET',
            url: "https://gorest.co.in/public/v2/users",
            headers: {
                Authorization: `Bearer 4682c7888368922069a06b7001ebf5a7e7d3c8ab7269669606c6491b6c0e87d9`
            }
        }).then(function (res) {
            expect(res.status).to.eql(200)
            id = res.body[0].id

        }).then(function () {

            cy.request({
                method: 'PUT',
                url: `https://gorest.co.in/public/v2/users/${id}`,
                headers: {
                    Authorization: `Bearer 4682c7888368922069a06b7001ebf5a7e7d3c8ab7269669606c6491b6c0e87d9`
                },

                body: {
                    "name": "Allasani Peddana",
                    "email": updateEmail,
                    "status": "active"
                }
            })

        }).then(function() {

            cy.request({
                method: 'GET',
                url: `https://gorest.co.in/public/v2/users/${id}`,
                headers: {
                    Authorization: `Bearer 4682c7888368922069a06b7001ebf5a7e7d3c8ab7269669606c6491b6c0e87d9`
                }
            }).then(function (res) {
                expect(res.body.email).to.equal(updateEmail)
            })

        })

    })

})