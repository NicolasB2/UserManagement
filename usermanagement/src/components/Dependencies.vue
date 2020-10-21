<template>
  <v-container>
    <v-data-table :headers="headers" :items="dependencies" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title> Dependencies </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add dependencie
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
                        v-model="editedItem.coordinator"
                        label="Coordinator"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.maxusers"
                        label="Maximun number of users"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.location"
                        label="Location"
                      ></v-text-field>
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
                  Add dependencie
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this dependencie?</v-card-title
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

          <v-dialog v-model="dialogInfo">
            <v-card>
              <v-card-title class="headline">
                Dependencie details
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <label > Name: {{dependecieView.name}} </label>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <label> Coordinator: {{dependecieView.coordinator}}</label>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <label> Maximun number of users: {{dependecieView.maxusers}} </label>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <label > Location: {{dependecieView.location}}</label>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <label > State: {{dependecieView.state}}</label>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <label > Users </label>
                      <ul >
                         <li v-for="user in users" :key="user.id">
                            {{user.name}} {{user.lastname}}
                         </li>
                      </ul>
                      
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>


            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:item.plus="{ item }">
        <v-icon small class="mr-2" @click="infoItem(item)"> Details </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="getDependecies"> Reset </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="error" max-width="400px">
      <v-alert type="error">You can delete a dependecy with users</v-alert>
    </v-dialog>
  </v-container>
</template>


<script>
import { db } from "../main";
export default {
  data: () => ({
    dialog: false,
    error: false,
    dialogDelete: false,
    dialogInfo: false,
    headers: [
      { text: "Name", align: "start", sortable: false, value: "name" },
      { text: "Coordinator", value: "coordinator" },
      { text: "Maximun number of users", value: "maxusers" },
      { text: "Location", value: "location" },
      { text: "State", value: "state" },
      { text: "Actions", value: "actions", sortable: false },
      { text: "Plus", value: "plus"}
    ],
    dependencies: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      coordinator: "",
      maxusers: 0,
      location: "",
      state: "",
    },
    defaultItem: {
      id: "",
      name: "",
      coordinator: "",
      maxusers: 0,
      location: "",
      state: "",
    },
    dependecieView: {
      id: "",
      name: "",
      coordinator: "",
      maxusers: 0,
      location: "",
      state: "",
    },
    users: [],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Dependencie" : "Edit Dependencie";
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
    this.getDependecies();
  },

  methods: {
    async getDependecies() {
      try {
        this.dependencies = [];
        const snapshot = await db.collection("dependencies").get();

        snapshot.forEach((doc) => {
          let dependencieData = doc.data();
          dependencieData.id = doc.id;
          this.dependencies.push(dependencieData);
        });
      } catch (error) {
        console.log(error);
      }
    },

    async save() {
      try {
        
        if (this.editedIndex > -1) {
          
          await db.collection("dependencies").doc(this.editedItem.id).update({
            id: this.editedItem.id,
            name: this.editedItem.name,
            coordinator: this.editedItem.coordinator,
            maxusers: this.editedItem.maxusers,
            location: this.editedItem.location,
            state: this.editedItem.state,
          });

        } else {
          await db.collection("dependencies").add(this.editedItem);
          this.dependencies.push(this.editedItem);
          
        }

        this.getDependecies();
       
      } catch (error) {
        console.log(error);
      }

      this.close();
    },

    async deleteItemConfirm() {
      try {

        const snapshot = await db.collection("users").where("dependencie", "==", this.dependencies[this.editedIndex].name).get();
        const size = snapshot.size;

        if(size > 0){
          this.error = true;
        }else{
          await db.collection("dependencies").doc(this.dependencies[this.editedIndex].id).delete();
          this.dependencies.splice(this.editedIndex, 1);
        }

      } catch (error) {
        console.log(error);
      }

      this.closeDelete();
    },



    deleteItem(item) {
      this.editedIndex = this.dependencies.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async editItem(item) {
      this.editedIndex = this.dependencies.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async infoItem(item){
      
      this.dependecieView.id = item.id;
      this.dependecieView.name = item.name;
      this.dependecieView.coordinator = item.coordinator;
      this.dependecieView.maxusers = item.maxusers;
      this.dependecieView.location = item.location;
      this.dependecieView.state = item.state;
      this.findUsersByDependencie()
      this.dialogInfo = true;
    },

    async findUsersByDependencie(){
      this.users = [];
      const snapshot = await db.collection("users").where("dependencie", "==", this.dependecieView.name).get();
      
      snapshot.forEach((doc) => {
          let userData = doc.data();
          userData.id = doc.id;
          this.users.push(userData);
      });

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