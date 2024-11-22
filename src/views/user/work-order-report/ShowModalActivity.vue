
<script>
	export default {
		props: {
			showModalViewActivity: Boolean,
		}
	}

</script>

<template>
	<BModal v-model="showModalViewActivity" hide-footer title="View Activity" centered class="v-modal-custom" size="xl">
		<BForm v-if="selectedViewActivity !== null">
			<BRow>
				<BCol md="12" class="mb-3">
					<div>
						<label for="">Judul <span class="text-danger">*</span></label>
						<input type="text" class="form-control" placeholder="Masukkan judul"
							v-model="dataActivity[selectedViewActivity].title" disabled>
					</div>
				</BCol>
				<BRow class="mb-3">
					<BCol md="4">
						<div>
							<label for="" class="form-label">Start Date<span class="text-danger">*</span></label>
							<div class="input-group">
								<flat-pickr v-model="dataActivity[selectedViewActivity].startDate" class="form-control"
									id="date" placeholder="Pilih Tanggal" disabled=""></flat-pickr>
							</div>
						</div>
					</BCol>
					<BCol md="4">
						<div>
							<label for="" class="form-label">Due Date<span class="text-danger">*</span></label>
							<div class="input-group">
								<flat-pickr v-model="dataActivity[selectedViewActivity].endDate" class="form-control"
									id="date" placeholder="Pilih Tanggal" disabled=""></flat-pickr>
							</div>
						</div>
					</BCol>
					<BCol md="4">
						<div>
							<label for="" class="form-label">Actual Finish Date</label>
							<div class="input-group">
								<flat-pickr v-model="dataActivity[selectedViewActivity].actualFinishDate"
									class="form-control" id="date" placeholder="Pilih Tanggal" disabled=""></flat-pickr>
							</div>
						</div>
					</BCol>
				</BRow>
				<BCol md="12" class="mb-3">
					<div>
						<label for="">Note </label>
						<textarea type="text" class="form-control" placeholder="Masukkan note"
							v-model="dataActivity[selectedViewActivity].note" disabled=""></textarea>
					</div>
				</BCol>

				<label for="" class="form-label">Line Items <span class="text-danger">*</span></label>
				<BRow class="mb-3" v-for="(item, index) in formDataActivity.items" :key="index">

					<BCol md="2">
						<div>
							<multiselect v-model="dataActivity[selectedViewActivity].items[index].inventoryId"
								:options="inventories" :searchable="false" placeholder="Pilih Inventory"
								:allow-empty="false" value-prop="id" label="name" :disabled="true">
								<template #singleLabel="{ option }"><strong>{{ option.name }}</strong></template>
							</multiselect>
						</div>
					</BCol>
					<BCol md="2">
						<div>
							<input type="text" class="form-control" placeholder="Masukkan Nama"
								v-model="dataActivity[selectedViewActivity].items[index].type" disabled>
						</div>
					</BCol>
					<BCol md="2" class="pe-0">
						<div>
							<div class="input-group">
								<input type="number" class="form-control" id="quantity" width="80%"
									placeholder="Quantity" required
									v-model="dataActivity[selectedViewActivity].items[index].qty"
									@change="lineItemCalculate(index)">
								<select id="" class="form-select" disabled="">
									<option selected>{{ dataActivity[selectedViewActivity].items[index].unit }}</option>
								</select>
							</div>
						</div>
					</BCol>

					<BCol md="6" class="p-0">
						<div class="d-flex justify-content-between">
							<div class="d-flex align-items-center mx-2">
								<i class="bx bx-x fs-22"></i>
							</div>
							<div>
								<input type="number" class="form-control" placeholder="Rp 0"
									v-model="dataActivity[selectedViewActivity].items[index].price" disabled>
							</div>
							<div class="d-flex align-items-center mx-2">
								<i class="las la-equals fs-22"></i>
							</div>
							<div>
								<input type="number" class="form-control" disabled placeholder="Rp 0"
									v-model="dataActivity[selectedViewActivity].items[index].total">
							</div>
							<div class="d-flex align-items-center mx-2">
								<BButton variant="link" class="p-1 rounded-circle" @click="copyItem(index)"><i
										class="bx bxs-copy-alt fs-22"></i></BButton>
							</div>
							<div class="d-flex align-items-center mx-2">
								<BButton variant="link" class="p-1 rounded-circle d-flex align-items-center bg-light"
									@click="deleteItem(index)"
									v-if="dataActivity[selectedViewActivity].items.length > 1"><i
										class="bx bx-x fs-22"></i></BButton>
							</div>
						</div>
					</BCol>
				</BRow>
				<BCol md="12">
					<div>
						<label for="">Subtotal </label>
						<input type="number" class="form-control" placeholder="Rp0" disabled
							v-model="dataActivity[selectedViewActivity].total">
					</div>
				</BCol>
			</BRow>
		</BForm>
	</BModal>
</template>
