<template>
    <div :class="{success: success, error: error, warning: warning}"><p>{{ info }}</p></div>
</template>


<script>
export default {
    props: ['error', 'success', 'warning', 'info']
}
</script>

<style scoped>
    div {
        position: absolute;
        width: max-content;
        padding: 10px;
        color: white;
        border-radius: 20px;
        left: 50%;
        top: -42px;
        transform: translateX(-50%);
        transition: all 0.5s ease-in-out;
    }
    .warning {
        top: 22px;
        background: #23173A;
    }
    .error {
        top: 22px;
        background: #EA1601;
    }
    .success {
        top: 22px;
        background: #64BC26;
    }
</style>