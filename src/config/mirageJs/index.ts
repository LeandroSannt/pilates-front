import { createServer, Model } from 'miragejs';

const turnOnMirageJs = () => {
  createServer({
    models: {
      manageUsers: Model,
      companies: Model,
      templates: Model,
    },

    // seeds(server) {
    //   server.db.loadData({
    //     manageUsers: manageUsersMock,
    //     companies: companiesMock,
    //     templates: templateMock,
    //   });
    // },

    // routes() {
    //   this.namespace = 'api';

    //   this.post('/auth/signin', (_schema, request) => {
    //     const data = JSON.parse(request.requestBody);
    //     if (
    //       data.username === userLoggedMock.username &&
    //       data.password === userLoggedMock.password
    //     ) {
    //       return {
    //         user: {
    //           username: data.username,
    //           password: data.password,
    //         },
    //         token: '1234',
    //       };
    //     }

    //     return false;
    //   });

    //   this.get('/manage-users', () => {
    //     const response = this.schema.all('manageUsers');
    //     return response.models.map((model) => {
    //       return model.attrs;
    //     });
    //   });

    //   this.put('/manage-users/new-user', (schema, request) => {
    //     const data = JSON.parse(request.requestBody);
    //     return schema.create('manageUsers', data);
    //   });

    //   this.post(`/manage-users`, (schema: any, request) => {
    //     const data = JSON.parse(request.requestBody);
    //     const userData = schema.manageUsers.find(data.id);
    //     userData.update({
    //       email: data.email,
    //       perfil: data.perfil,
    //       username: data.username,
    //     });
    //     return userData;
    //   });

    //   this.delete(`/manage-users/:id`, (schema: any, request) => {
    //     let id = request.params.id;
    //     return schema.manageUsers.find(id).destroy();
    //   });

    //   this.get('/templates', () => {
    //     const response = this.schema.all('templates');
    //     return response.models.map((model) => {
    //       return model.attrs;
    //     });
    //   });

    //   this.put('/templates/new-template', (schema, request) => {
    //     const data = JSON.parse(request.requestBody);
    //     return schema.create('templates', data);
    //   });

    //   this.delete(`/templates/:id`, (schema: any, request) => {
    //     let id = request.params.id;
    //     return schema.templates.find(id).destroy();
    //   });

    //   this.get('/companies', () => {
    //     const response = this.schema.all('companies');
    //     return response.models.map((model) => {
    //       return model.attrs;
    //     });
    //   });

    //   this.put('/companies', (schema, request) => {
    //     const data = JSON.parse(request.requestBody);
    //     return schema.create('companies', data);
    //   });

    //   this.delete(`/companies/:id`, (schema: any, request) => {
    //     let id = request.params.id;
    //     return schema.companies.find(id).destroy();
    //   });
    // },
  });
};

export { turnOnMirageJs };

