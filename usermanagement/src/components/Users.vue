<template>
  <v-container>
    <v-row>
      <v-col cols="6" md="2">
        <v-text-field v-model="username" label="User name">
        </v-text-field>
      </v-col>
      <v-col cols="6" md="2">
        <v-btn color="primary" dark class="mb-2" @click="findUserByName" >
          Filter by Name
        </v-btn>
      </v-col>
      <v-col cols="6" md="2">
        <v-text-field v-model="dependencie" label="Dependencie">
        </v-text-field>
      </v-col>
      <v-col cols="6" md="2">
        <v-btn color="primary" dark class="mb-2" @click="findUsersByDependencie" >
          Filter by Dependencie
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table :headers="headers" :items="users" class="elevation-1">
      <template v-slot:top> 
        <v-toolbar flat>
          <v-toolbar-title> Users </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add user
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.lastname"
                        label="Last Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.password"
                        label="Password"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.validuntil"
                        label="Valid until"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.dependencie"
                        :items="items"
                        clearable
                        label="Dependencie"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.state"
                        label="State"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Add user
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="getUsers"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-container>
  
</template>


<script>
import { db } from "../main";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Name", align: "start", sortable: false, value: "name" },
      { text: "Last Name", value: "lastname" },
      { text: "Email", value: "email" },
      { text: "Password", value: "password" },
      { text: "Valid until", value: "validuntil" },
      { text: "Dependencie", value: "dependencie" },
      { text: "State", value: "state" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    items: [],
    users: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      lastname: "",
      email: "",
      password: "",
      validuntil: "",
      dependencie: "",
      state: "",
    },
    defaultItem: {
      id: "",
      name: "",
      lastname: "",
      email: "",
      password: "",
      validuntil: "",
      dependencie: "",
      state: "",
    },
    dependencie: "",
    username: "",
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add User" : "Edit User";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.getUsers();
    this.getDependecies();
  },

  methods: {
    async getDependecies() {
      try {
        const snapshot = await db.collection("dependencies").get();

        snapshot.forEach((doc) => {
          let dependencieData = doc.data();
          this.items.push(dependencieData.name);
        });
      } catch (error) {
        console.log(error);
      }
    },

    async getUsers() {
      try {
        this.users = [];
        const snapshot = await db.collection("users").get();

        snapshot.forEach((doc) => {
          let userData = doc.data();
          userData.id = doc.id;
          this.users.push(userData);
        });
      } catch (error) {
        console.log(error);
      }
    },

    async save() {
      try {

        var CryptoJS = require("crypto-js");
        var ciphertext = CryptoJS.AES.encrypt(this.editedItem.password, 'secret key 123').toString();

        if (this.editedIndex > -1) {
              await db.collection("users").doc(this.editedItem.id).update({
              id: this.editedItem.id,
              name: this.editedItem.name,
              lastname: this.editedItem.lastname,
              email: this.editedItem.email,
              password: ciphertext,
              validuntil: this.editedItem.validuntil,
              dependencie: this.editedItem.dependencie,
              state: this.editedItem.state,
          });

        } else {
          await db.collection("users").add({
              id: this.editedItem.id,
              name: this.editedItem.name,
              lastname: this.editedItem.lastname,
              email: this.editedItem.email,
              password: ciphertext,
              validuntil: this.editedItem.validuntil,
              dependencie: this.editedItem.dependencie,
              state: this.editedItem.state,
          });
        }
        this.getUsers();

      } catch (error) {
        console.log(error);
      }

      this.close();
    },

    async deleteItemConfirm() {
      try {
        await db
          .collection("users")
          .doc(this.users[this.editedIndex].id)
          .delete();
      } catch (error) {
        console.log(error);
      }

      this.users.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    async findUsersByDependencie(){
      try {
        
        this.users = []; 
        const snapshot = await db.collection("users").where("dependencie", "==", this.dependencie).get();

          snapshot.forEach((doc) => {
            let userData = doc.data();
            userData.id = doc.id;
            this.users.push(userData);
          });
        
      } catch (error) {
        console.log(error)
      }

    },

    async findUserByName(){
      try {
        this.users = []; 
        const snapshot = await db.collection("users").where("name", "==", this.username).get();
        
          snapshot.forEach((doc) => {
            let userData = doc.data();
            userData.id = doc.id;
            this.users.push(userData);
          });
        
      } catch (error) {
        console.log(error)
      }
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>


<style>
</style>