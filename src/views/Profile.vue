<template>
    <div class="row">
        <div class="col-md-3">
            <div class="card card-primary">
                <div class="card-body box-profile">
                    <div class="text-center">
                        <img
                            class="profile-user-img img-fluid img-circle"
                            src="../assets/default-profile.png"
                            alt="User profile picture"
                        />
                    </div>
                    <h3 class="profile-username text-center">
                        {{ store.user.name }}
                    </h3>
                    <p class="text-muted text-center">
                        {{ store.user.email }}
                    </p>
                    <!--ul class="list-group list-group-unbordered mb-3">
                        <li class="list-group-item">
                            <b>No. Patronal</b>
                            <a class="float-right">1,322</a>
                        </li>
                    </ul-->
                    <router-link
                        :to="{ name: 'tramites.seleccionar' }"
                        class="btn btn-outline-primary btn-block"
                    >
                        <b>Realizar trámite</b>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="col-md-9">
            <div class="card">
                <div class="card-header p-2">
                    <ul class="nav nav-pills">
                        <li class="nav-item">
                            <a
                                class="nav-link active"
                                href="#account"
                                data-toggle="tab"
                            >Datos Generales</a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                href="#representantes"
                                data-toggle="tab"
                            >Representantes Legales</a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                href="#socios"
                                data-toggle="tab"
                            >Socios</a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                href="#accionistas"
                                data-toggle="tab"
                            >Accionistas</a>
                        </li>
                    </ul>
                </div>
                <div class="card-body">
                    <div class="tab-content">
                        <div
                            id="account"
                            class="active tab-pane"
                        >
                            Datos Generales
                        </div>
                        <div
                            id="representantes"
                            class="tab-pane"
                        >
                            Representantes
                        </div>
                        <div
                            id="socios"
                            class="tab-pane"
                        >
                            Socios
                        </div>
                        <div
                            id="accionistas"
                            class="tab-pane"
                        >
                            Accionistas
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from "@/store";

const store = useUserStore();
</script>
