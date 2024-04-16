<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <section class="preferences-wrapper">
        <h1 class="preferences-wrapper__title">{{ welcomeMessage }}</h1>
        <p>Feito com &#128147 por Lucas</p>
      </section>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonButton, IonItem, IonList, IonInput } from '@ionic/vue';

const welcomeMessage: string = `Olá, ${localStorage.getItem('userDisplayName') || ""}`;
</script>

<style lang="scss" scoped>
ion-content {
  --background: #F2DFE2;
  --color: #591B1B;
}

ion-button {
  width: 100%;
  --background: #591B1B;
  --background-hover: #591B1B;
  --background-activated: #451818;
  --background-focused: #451818;
  --color: #F2DFE2;
}

.preferences-wrapper {
  height: 100%;
  padding: 12dvw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 80dvh;

  &__title {
    font-weight: bolder;
    font-size: 2rem;
  }
}
</style>