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
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field required v-model="editedItem.name"
                                              label="Name"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field required v-model="editedItem.phoneNumber"
                                              label="Phone number"></v-text-field>
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

        <!-- Header -->
        <v-toolbar>
            <v-toolbar-title>Phone book test application</v-toolbar-title>
            <v-spacer></v-spacer>
            <template v-if="$vuetify.breakpoint.smAndUp">
                <v-btn icon>
                    <v-icon @click.stop="dialog = true">mdi-plus-circle</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon @click.stop="dialog = true">mdi-upload</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>mdi-download</v-icon>
                </v-btn>
            </template>
        </v-toolbar>

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
    import ServerApi from './serverApi'

    const serverApi = new ServerApi('')

    export default {
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
                this.phoneBookEntries = await serverApi.getAll()
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
                await serverApi.delete({name, phoneNumber})
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
                    const success = await serverApi.add({name, phoneNumber})
                    if (success) {
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
