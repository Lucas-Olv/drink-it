<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <section class="welcome-wrapper">
        <h1 class="welcome-wrapper__title">DRINK IT!</h1>
        <ion-button @click="logInWithGoogleAndRedirect" size="large">
          <ion-icon slot="start" :icon="logoGoogle"></ion-icon>
          <ion-text slot="end">Log-in com Google</ion-text>
        </ion-button>
      </section>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonButton, IonIcon, IonText, UseIonRouterResult, useIonRouter } from '@ionic/vue';
import { logoGoogle } from 'ionicons/icons';
import FirebaseApi from '@/utility/FirebaseApi';

const ionRouter: UseIonRouterResult = useIonRouter();
const firebaseApi: FirebaseApi = new FirebaseApi();

async function logInWithGoogleAndRedirect() {
  const token = await firebaseApi.logInWithGoogleProvider();
  token ? ionRouter.push('/home') : alert('Ocorreu um erro ao fazer log-in');
  
}
</script>

<style scoped lang="scss">

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

.welcome-wrapper {
  height: 100%;
  padding: 12dvw;
  display: flex;
  gap: 75dvh;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    font-weight: bold;
    font-size: 2.8rem;
  }
}
</style>