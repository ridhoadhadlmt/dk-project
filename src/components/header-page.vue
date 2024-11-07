<script>
</script>



<template>
    <BRow>
        <BCol cols="12">
            <div class="h-100">
                <BRow class="mb-3 pb-1">
                    <BCol cols="12">
                        <div class="d-flex align-items-lg-center flex-lg-row flex-column">
                            <div class="flex-grow-1">
                                <h4 class="header-title">{{ $route.meta.title }}</h4>
                                <p class="header-description">
                                    {{ $route.meta.description }}
                                </p>
                            </div>

                        </div>
                    </BCol>
                </BRow>
            </div>
        </BCol>
    </BRow>
</template>

<style scoped>
.header-title {
    font-size: 22px;
    color: #181C32;
    font-weight: 600;
}

.header-description {
    font-size: 14px;
    font-weight: 500;
    color: #A1A5B7;
}
</style>
