<script setup>
  import { VTimeline, VTimelineItem,VCard, VCardTitle, VCardText, VBtn } from 'vuetify/components';
</script>

<template>
  <v-timeline direction="horizontal">
    <v-timeline-item>
      <template v-slot:opposite> Opposite content </template>
      <div>
        <div class="text-h6">Content title</div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </v-timeline-item>

    <v-timeline-item>
      <template v-slot:opposite>
        <v-card>
          <v-card-title :class="['text-h6', `titleColor`]">
            Lorem Ipsum Dolor
          </v-card-title>
          <v-card-text class="bg-white text--primary">
            <p style="margin-top: 20px">
              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
              scaevola imperdiet nec ut, sed euismod convenire principes at. Est
              et nobis iisque percipit, an vim zril disputando voluptatibus, vix
              an salutandi sententiae.
            </p>
            <v-btn variant="outlined"> Button </v-btn>
          </v-card-text>
        </v-card>
        <label style="display: flex; justify-content: center; padding-top: 15px"
          >時間：2024.9.16</label
        >
      </template>
      <div>
        <div class="text-h6">Content title</div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </v-timeline-item>

    <v-timeline-item>
      <template v-slot:opposite> Opposite content </template>
      <div>
        <div class="text-h6">Content title</div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<style lang="css" scoped>
 .titleColor {
    background-color: red;
  }
</style>