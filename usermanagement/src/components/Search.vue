<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
  >
   </v-data-table>
</template>

<script>
export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Last Name', value: 'lastname' },
        { text: 'Email', value: 'email' },
        { text: 'Password', value: 'password' },
        { text: 'Valid until', value: 'validuntil' },
        { text: 'Dependencie', value: 'dependencie' },
        { text: 'State', value: 'state' },
      ],
      desserts: [],
      defaultItem: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        validuntil: '',
        dependencie: '',
        state: ''
      },
    }),
  created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            name: 'David Alejandro',
            lastname: 'Erazo Ochoa',
            email: 'erazo29@hotmail.com',
            password: '***********',
            validuntil: '20/04/2021',
            dependencie: 'Docente',
            state: 'Activo'            
          },
          {
            name: 'Jeffrey',
            lastname: 'Ochoa Ochoa',
            email: 'jeffreyisGay@hotmail.com',
            password: '***********',
            validuntil: '20/04/2021',
            dependencie: 'Student',
            state: 'Activo'            
          },
        ]
      },
    }
};

</script>
  
<style>
</style>