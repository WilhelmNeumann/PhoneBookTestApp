<template>
    <v-dialog v-model="uploadDialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">Upload phone numbers</span>
            </v-card-title>
            <v-card-text>
                <v-file-input v-model="fileToUpload" display-size label="File input"></v-file-input>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import config from './../../config/default'
    import ServerApi from './../serverApi'

    const serverApi = new ServerApi(config.application.api)
    const phoneBookEntriesApi = serverApi.phoneBookEntries


    export default {
        name: "UploadPhoneBookModalDialog",
        props: {
            uploadDialog: {
                default: false,
                type: Boolean
            },
            onUpload: {
                type: Function
            }
        },
        data: () => ({
            fileToUpload: null
        }),

        watch: {
            fileToUpload(file) {
                this.upload(file)
            }
        },

        methods: {
            close() {
                this.$emit('update:uploadDialog', false)
            },

            async upload(file) {
                if (!file) return
                const text = await file.text()
                const phoneBook = await JSON.parse(text)

                const response = await phoneBookEntriesApi.upload(phoneBook)
                if (response.status) {
                    alert(response.payload)
                }
                await this.onUpload()
                this.$emit('update:uploadDialog', false)
            }
        }
    }
</script>
