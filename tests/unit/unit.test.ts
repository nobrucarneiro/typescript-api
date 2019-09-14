import { testDouble, expect } from './config/helpers';
import User from '../../server/modules/user/service';
const model = require('../../server/models');

describe('Testes unitários do controller', () => {

    const defaultUser = {
        id:1,
        name:'Default User',
        email:'defaultUser@email.com',
        password:'1234'

    }

    beforeEach((done) =>{ 
        model.User.destroy({
            where:{}
        })
        .then(() => {
            model.User.create(defaultUser).then(() => {
                console.log('Default User Created');
                done();
            });
        });
    });

    describe('Método Create', () => { 
        it('Deve criar um novo usuário', () => {
            const newUser = {
                id:2,
                name:'New User',
                email:'newuser@email.com',
                password:'1234'
            };

        return User.create(newUser)
            .then(data => { 
                expect(data.dataValues).to.have.all.keys(
                    ['email', 'id', 'name', 'password', 'updatedAt', 'createdAt']
                )
            });
        });
    });

    describe('Método Update', () => {
        it('Deve atualizar um usuário', () => {
            const usuarioAtualizado = {
                name:'Nome Atualizado',
                email:'email@atualizado.com'
            };

            return User.update(defaultUser.id, usuarioAtualizado).then(data => {
                expect(data[0]).to.be.equal(1);
            })
        });
    });

    describe('Método Get Users', () => {
        it('Deve retornar uma lista com todos os usários', () => {
            return User.getAll().then(data => {
                expect(data).to.be.an('array')
            })
        });
    });


    describe('Método GetByID', () => {
        it('Deve retornar um usuário de acordo com o id passado', () => {
            return User.getById(defaultUser.id).then(data =>{
                expect(data).to.have.all.keys(
                    ['email', 'id', 'name', 'password']
                )
            })
        });
    });



    describe('Método GetByEmail', () => {
        it('Deve retornar um usuário de acordo com o email passado', () => {
            return User.getByEmail(defaultUser.email).then(data =>{
                expect(data).to.have.all.keys(
                    ['email', 'id', 'name', 'password']
                )
            })
        })
    })


    describe('Método Delete', () => {
        it('Deve deletar um usuário', () => {

            return User.delete(defaultUser.id).then(data => {
                expect(data).to.be.equal(1);
            })
        });
    });

});