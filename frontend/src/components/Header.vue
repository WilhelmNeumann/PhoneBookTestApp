<template>
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
</template>

<script>
    export default {
        name: "Header"
    }
</script>
