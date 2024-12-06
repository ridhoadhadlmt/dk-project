<script>
import reminders from './reminders.vue';
import issues from './issues.vue';
import workOrders from './work-orders.vue';
import backlogs from './backlogs.vue';
import questioners from './questioners.vue';

export default {
    components: {
        reminders,
        issues,
        workOrders,
        backlogs,
        questioners
    }
}
</script>
<template>
    <BRow class="gy-4 py-3">
        <BCol lg="12">
            <reminders/>
        </BCol>
        <BCol lg="12">
            <issues/>
        </BCol>
        <BCol lg="12">
            <workOrders/>
        </BCol>
        <BCol lg="12">
            <backlogs/>
        </BCol>
        <BCol lg="12">
            <questioners/>
        </BCol>
        
    </BRow>
</template>