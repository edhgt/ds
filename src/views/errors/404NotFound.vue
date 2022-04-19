<template>
    <div class="row mb-2">
        <div class="col-12">
            <div class="text-center mt-5">
                <div class="error-page">
                    <h1 class="headline error-page text-warning">
                        404
                    </h1>
                    <h4><i class="fas fa-exclamation-triangle text-warning"></i> ¡Lo sentimos! Página no encontrada.</h4>
                    <h5>
                        <router-link :to="{ name: 'home' }">
                            Ir a la página principal
                        </router-link>
                    </h5>
                </div>
            </div>
        </div>
    </div>
</template>
