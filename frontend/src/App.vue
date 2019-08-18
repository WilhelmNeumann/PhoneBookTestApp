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
                const result = await serverApi.getAll()

                this.phoneBookEntries = [
                    {
                        name: 'Frozen Yogurt',
                        phoneNumber: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                    },
                    {
                        name: 'Ice cream sandwich',
                        phoneNumber: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3,
                    },
                    {
                        name: 'Eclair',
                        phoneNumber: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0,
                    },
                    {
                        name: 'Cupcake',
                        phoneNumber: 305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3,
                    },
                    {
                        name: 'Gingerbread',
                        phoneNumber: 356,
                        fat: 16.0,
                        carbs: 49,
                        protein: 3.9,
                    },
                    {
                        name: 'Jelly bean',
                        phoneNumber: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0,
                    },
                    {
                        name: 'Lollipop',
                        phoneNumber: 392,
                        fat: 0.2,
                        carbs: 98,
                        protein: 0,
                    },
                    {
                        name: 'Honeycomb',
                        phoneNumber: 408,
                        fat: 3.2,
                        carbs: 87,
                        protein: 6.5,
                    },
                    {
                        name: 'Donut',
                        phoneNumber: 452,
                        fat: 25.0,
                        carbs: 51,
                        protein: 4.9,
                    },
                    {
                        name: 'KitKat',
                        phoneNumber: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7,
                    },
                ]
            },

            editItem(item) {
                this.editedIndex = this.phoneBookEntries.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                const index = this.phoneBookEntries.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.phoneBookEntries.splice(index, 1)
            },

            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save() {
                if (this.editedIndex > -1) {
                    Object.assign(this.phoneBookEntries[this.editedIndex], this.editedItem)
                } else {
                    this.phoneBookEntries.push(this.editedItem)
                }
                this.close()
            },
        },
    }
</script>
