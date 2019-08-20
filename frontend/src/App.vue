<template>
    <div>
        <!-- Add/edit phone book entry modal dialog -->
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col v-if="editMode===-1" cols="12" sm="6" md="6">
                                <v-text-field
                                        v-model="editedItem.name"
                                        :counter="10"
                                        :rules="nameRules"
                                        label="Name"
                                        required
                                ></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field
                                        v-model="editedItem.phoneNumber"
                                        :counter="10"
                                        :rules="phoneNumberRules"
                                        label="Phone number"
                                        required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <UploadPhoneBookModalDialog :uploadDialog.sync="uploadDialog" :on-upload="initialize"/>

        <!-- Header -->
        <template>
            <v-toolbar>
                <v-toolbar-title>Phone book test application</v-toolbar-title>
                <v-spacer></v-spacer>
                <template v-if="$vuetify.breakpoint.smAndUp">
                    <v-btn icon>
                        <v-icon @click.stop="dialog = true">mdi-plus-circle</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon @click.stop="download">mdi-download</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon @click.stop="uploadDialog = true">mdi-upload</v-icon>
                    </v-btn>
                </template>
            </v-toolbar>
        </template>
        <!-- Phone numbers table -->
        <v-data-table :headers="headers"
                      :items="phoneBookEntries"
                      class="elevation-1">
            <template v-slot:item.action="{ item }">
                <v-icon small
                        class="mr-2"
                        @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small
                        @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="#fff" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import config from './../config/default'
    import ServerApi from './serverApi'
    import UploadPhoneBookModalDialog from "./components/UploadPhoneBookModalDialog";

    const serverApi = new ServerApi(config.application.api)
    const phoneBookEntriesApi = serverApi.phoneBookEntries

    export default {
        components: {UploadPhoneBookModalDialog},
        data: () => ({
            dialog: false,
            uploadDialog: false,
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length >= 2 || 'Name must be longer than 2 characters'
            ],
            phoneNumberRules: [
                v => !!v || 'Phone number is required',
                v => v.length >= 5 || 'Phone number must be longer than 5 characters'
            ],
            headers: [
                {text: 'Name', value: 'name',},
                {text: 'PhoneNumber', value: 'phoneNumber'},
                {text: 'Actions', value: 'action', sortable: false, width: '70px'},
            ],
            phoneBookEntries: [],
            editMode: -1,
            editedItem: {
                name: '',
                phoneNumber: 0
            },
            defaultItem: {
                name: '',
                phoneNumber: 0
            },
        }),

        computed: {
            formTitle() {
                return this.editMode === -1 ? 'New entry' : 'Edit entry'
            },
        },

        watch: {
            dialog(val) {
                val || this.close()
            }
        },

        created() {
            this.initialize()
        },

        methods: {
            download() {
                const phoneNumbers = this.phoneBookEntries.map(element => {
                    return {
                        name: element.name,
                        phoneNumber: element.phoneNumber
                    }
                })

                const content = {
                    phoneBook: phoneNumbers
                }

                const stringContent = JSON.stringify(content)
                const a = document.createElement('a');
                const file = new Blob([stringContent], {type: 'text/json'});
                a.href = URL.createObjectURL(file);
                a.download = 'phoneNumbers.json';
                a.click();
            },

            async initialize() {
                this.phoneBookEntries = await phoneBookEntriesApi.getAll()
            },

            editItem(item) {
                this.editMode = this.phoneBookEntries.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            async deleteItem(item) {
                const index = this.phoneBookEntries.indexOf(item)
                const entry = this.phoneBookEntries[index]
                confirm('Are you sure you want to delete this item?') && this.phoneBookEntries.splice(index, 1)
                const {
                    name, phoneNumber
                } = entry
                await phoneBookEntriesApi.delete({name, phoneNumber})
            },

            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editMode = -1
                }, 300)
            },

            async save() {
                const {
                    name, phoneNumber
                } = this.editedItem

                if (this.editMode > -1) {
                    const responseData = await phoneBookEntriesApi.update({name, phoneNumber})
                    if (responseData.status === 'error') {
                        alert(responseData.payload)
                        return
                    }
                    Object.assign(this.phoneBookEntries[this.editMode], this.editedItem)
                } else {
                    const responseData = await phoneBookEntriesApi.add({name, phoneNumber})
                    if (responseData.status === 'error') {
                        alert(responseData.payload)
                        return
                    }
                    this.phoneBookEntries.push(this.editedItem)
                }
                this.close()
            }
        }
    }
</script>
