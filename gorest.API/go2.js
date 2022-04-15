let AccesToken = "6b6969174154db7f1addd6e109e39ba97e641ca5935f7f769ca77cd449186734"


describe('Validate the Gorest POST api', () => {
    it('Verify the Gorest POST Api', () => {
        let id =""
        cy.request({
            method: "POST",
            url: "https://gorest.co.in/public/v1/users",
            headers: {
                Authorization: `Bearer ${AccesToken}`
            },
            body: {
                "name": "Tenali Ramakrishna",
                "gender": "male",
                "email": "AherMahesh45@gmail.com",
                "status": "active"
            }
        }).then((res) => {

            // {
            //     "id": 4965,
            //     "name": "Tenali Ramakrishna",
            //     "email": "tenali.rama@76ce.com",
            //     "gender": "male",
            //     "status": "active"
            // }
            expect(res.status).to.eq(201)
           id= res.body.data['id']
        }).then(function () {
            cy.request({
                method: "GET",
                url: `https://gorest.co.in/public/v1/users/${id}`,
                headers: {
                    Authorization: `Bearer ${AccesToken}`
                }
            }).then((res) => {
                expect(res.status).to.eq(200)
            }).then((res) => {
                cy.request({
                    method: "DELETE",
                    url: `https://gorest.co.in/public/v1/users/${id}`,
                    headers: {
                        Authorization: `Bearer ${AccesToken}`
                    }
                }).then((res) => {
                    expect(res.status).to.eq(204)
                })
            })
        }).then(()=>{
            //cy.log(id)
            cy.request({
                method: "GET",
                url: `https://gorest.co.in/public/v1/users/${id}`,
                headers: {
                    Authorization: `Bearer ${AccesToken}`
                }
            }).then((res) => {
                expect(res.status).to.eq(404)
            })
        })
    })
})