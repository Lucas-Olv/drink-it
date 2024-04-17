<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <section class="preferences-wrapper">
        <h1 class="preferences-wrapper__title">{{ welcomeMessage }}</h1>
        <img @click="firebaseApi.requestUserPermissions" class="cat" src="../../public/cat.png" alt="Gatinhos!">
        <p class="preferences-wrapper__footer">Feito com &#128147 por Lucas</p>
      </section>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import FirebaseApi from '@/utility/FirebaseApi';

const welcomeMessage: string = `Olá, ${localStorage.getItem('userDisplayName') || ""}`;
const firebaseApi = new FirebaseApi();

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
  gap: 20dvh;

  &__title {
    font-weight: bold;
    font-size: 2rem;
  }

  &__cat {
    height: 10dvh;
    width: 10dvw;
  }

  &__footer {
    font-weight: bolder;
  }
}
</style>