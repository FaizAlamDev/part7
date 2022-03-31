describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		// user to backend
		const user = {
			name: 'Faiz Alam',
			username: 'faizalam',
			password: 'alamalam',
		}
		cy.request('POST', 'http://localhost:3003/api/users', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function () {
		cy.contains('Log in to application')
		cy.contains('username')
		cy.contains('password')
		cy.get('#loginBtn').should('contain', 'login')
	})

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.get('#username').type('faizalam')
			cy.get('#password').type('alamalam')
			cy.get('#loginBtn').click()

			cy.contains('faizalam logged in')
		})

		it('fails with wrong credentials', function () {
			cy.get('#username').type('faizalam')
			cy.get('#password').type('alam')
			cy.get('#loginBtn').click()

			cy.get('.error')
				.should('contain', 'wrong username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
		})

		describe('when logged in', function () {
			beforeEach(function () {
				// login
				cy.get('#username').type('faizalam')
				cy.get('#password').type('alamalam')
				cy.get('#loginBtn').click()

				cy.contains('faizalam logged in')
			})

			it('A blog can be created', function () {
				cy.contains('create new blog').click()
				cy.contains('create new')

				cy.get('#title').type('Jest')
				cy.get('#author').type('Faiz')
				cy.get('#url').type('localhost:3000')

				cy.get('#createBtn').click()

				cy.contains('Jest - Faiz')
			})

			describe('when a blog exists', function () {
				beforeEach(function () {
					// create blog
					cy.contains('create new blog').click()
					cy.contains('create new')

					cy.get('#title').type('Jest')
					cy.get('#author').type('Faiz')
					cy.get('#url').type('localhost:3000')

					cy.get('#createBtn').click()

					cy.contains('Jest - Faiz')
				})

				it('we can like it', function () {
					cy.get('#viewBtn').click()
					cy.get('#likeBtn').click()
					cy.contains('likes 1')
				})
			})

			describe('when multiple blogs exist', function () {
				// create 4 blogs
				beforeEach(function () {
					cy.createBlog({
						title: 'One',
						author: 'Faiz',
						url: 'one.com',
					})
					cy.createBlog({
						title: 'Two',
						author: 'Faiz',
						url: 'two.com',
					})
					cy.createBlog({
						title: 'Three',
						author: 'Faiz',
						url: 'three.com',
					})
				})

				it('logged in user can remove it', function () {
					cy.contains('Three - Faiz')
						.parent()
						.find('#viewBtn')
						.click()
					cy.contains('remove').click()
					cy.contains('Three - Faiz').should('not.exist')
				})

				it('other user cannot delete blog', function () {
					// making user moizalam
					const user1 = {
						name: 'Moiz Alam',
						username: 'moizalam',
						password: 'alamalam',
					}
					cy.request('POST', 'http://localhost:3003/api/users', user1)
					// logging out Faiz
					cy.contains('logout').click()
					// logging in Moiz
					cy.get('#username').type('moizalam')
					cy.get('#password').type('alamalam')
					cy.get('#loginBtn').click()

					cy.contains('moizalam logged in')

					cy.contains('Three - Faiz')
						.parent()
						.find('#viewBtn')
						.click()
					cy.contains('remove').should('not.exist')
				})

				it('they are ordered according to likes', function () {
					// like blog One 7 times
					cy.contains('One - Faiz').parent().find('#viewBtn').click()
					for (let i = 0; i < 7; i++) {
						cy.contains('like').click()
					}
					cy.contains('hide').click()

					// like blog Two 10 times
					cy.contains('Two - Faiz').parent().find('#viewBtn').click()
					for (let i = 0; i < 10; i++) {
						cy.contains('like').click()
					}
					cy.contains('hide').click()

					// like blog Three 3 times
					cy.contains('Three - Faiz')
						.parent()
						.find('#viewBtn')
						.click()
					for (let i = 0; i < 3; i++) {
						cy.contains('like').click()
					}
					cy.contains('hide').click()

					// checking order according to likes
					// Blog Two should be first
					// Blog One should be second
					// Blog Three should be third
					cy.get('.blog').then(($div) => {
						cy.get($div[0]).should('contain', 'Two - Faiz')
						cy.get($div[1]).should('contain', 'One - Faiz')
						cy.get($div[2]).should('contain', 'Three - Faiz')
					})
				})
			})
		})
	})
})
