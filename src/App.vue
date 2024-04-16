<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet, UseIonRouterResult, useIonRouter } from '@ionic/vue';

const ionRouter: UseIonRouterResult = useIonRouter();
const userUid: string = localStorage.getItem('userUid') || "";

userUid.length > 0 ? ionRouter.push('/home') : ionRouter.push('/');

</script>
