<template>
    <div>
        <!-- Add/edit phone book entry modal dialog -->
        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col v-if="editedIndex===-1" cols="12" sm="6" md="6">
                                <v-text-field required
                                              v-model="editedItem.name"
                                              label="Name*">
                                </v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field required
                                              v-model="editedItem.phoneNumber"
                                              label="Phone number*">
                                </v-text-field>
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

        <Header/>

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
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import Header from "./components/Header";
    import config from './../config/default'
    import ServerApi from './serverApi'

    const serverApi = new ServerApi(config.application.api)
    const phoneBookEntriesApi = serverApi.phoneBookEntries

    export default {
        components: {Header},
        data: () => ({
            dialog: false,
            headers: [
                {text: 'Name', value: 'name',},
                {text: 'PhoneNumbers', value: 'phoneNumber'},
                {text: 'Actions', value: 'action', sortable: false, width: '70px'},
            ],
            phoneBookEntries: [],
            editedIndex: -1,
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
                return this.editedIndex === -1 ? 'New entry' : 'Edit entry'
            },
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        created() {
            this.initialize()
        },

        methods: {
            async initialize() {
                this.phoneBookEntries = await phoneBookEntriesApi.getAll()
            },

            editItem(item) {
                this.editedIndex = this.phoneBookEntries.indexOf(item)
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
                    this.editedIndex = -1
                }, 300)
            },

            async save() {
                if (this.editedIndex > -1) {
                    Object.assign(this.phoneBookEntries[this.editedIndex], this.editedItem)
                } else {
                    const {
                        name, phoneNumber
                    } = this.editedItem
                    const responseData = await phoneBookEntriesApi.add({name, phoneNumber})

                    if (responseData) {
                        this.phoneBookEntries.push(this.editedItem)
                    } else {
                        alert("error")
                    }
                }
                this.close()
            },
        },
    }
</script>
