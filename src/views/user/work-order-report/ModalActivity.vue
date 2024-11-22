<script>
import { BModal, BForm, BRow, BCol, BButton } from 'bootstrap-vue'
export default {
	components: {
		BModal,
		BForm,
		BRow,
		BCol,
		BButton
	},
	name: "ActivityModal",
	props: {
		showModal: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			showModals: true,
			form: {
				title: "",
				startDate: "",
				dueDate: "",
				actualFinishDate: "",
				note: "",
			}
		}
	}
}
</script>

<template>
	<BModal :visible="showModals" hide-footer title="Tambah Aktifitas" centered class="v-modal-custom" size="xl">
		<BForm>
			<BRow>
				<BCol md="12" class="mb-3">
					<div>
						<label for="">Judul <span class="text-danger">*</span></label>
						<input type="text" class="form-control" placeholder="Masukkan judul">
					</div>
				</BCol>
				<BRow class="mb-3">
					<BCol md="4">
						<div>
							<label for="" class="form-label">Start Date<span class="text-danger">*</span></label>
							<div class="input-group">
								<input type="text" class="form-control border-end-0" id="date"
									placeholder="Pilih Tanggal" v-model="form.date" required>
								<span class="input-group-text border-start-0 bg-transparent fs-22"><img
										src="@/assets/icons/calendar.svg" width="20"></span>
							</div>
						</div>
					</BCol>
					<BCol md="4">
						<div>
							<label for="" class="form-label">Due Date<span class="text-danger">*</span></label>
							<div class="input-group">
								<input type="text" class="form-control border-end-0" id="date"
									placeholder="Pilih Tanggal" v-model="form.date" required>
								<span class="input-group-text border-start-0 bg-transparent fs-22"><img
										src="@/assets/icons/calendar.svg" width="20"></span>
							</div>
						</div>
					</BCol>
					<BCol md="4">
						<div>
							<label for="" class="form-label">Actual Finish Date</label>
							<div class="input-group">
								<input type="text" class="form-control border-end-0" id="date"
									placeholder="Pilih Tanggal" v-model="form.date" required>
								<span class="input-group-text border-start-0 bg-transparent fs-22"><img
										src="@/assets/icons/calendar.svg" width="20"></span>
							</div>
						</div>
					</BCol>
				</BRow>
				<BCol md="12" class="mb-3">
					<div>
						<label for="">Note </label>
						<input type="text" class="form-control" placeholder="Masukkan note">
					</div>
				</BCol>
				<BRow class="mb-3">
					<label for="" class="form-label">Line Items <span class="text-danger">*</span></label>
					<BCol md="2">
						<div>
							<select id="" class="form-select" required>
								<option selected>Part</option>
							</select>
						</div>
					</BCol>
					<BCol md="2">
						<div>
							<select id="" class="form-select" required>
								<option selected>Sparepart</option>
							</select>
						</div>
					</BCol>
					<BCol md="2" class="pe-0">
						<div>
							<div class="input-group">
								<input type="text" class="form-control" id="quantity" width="80%" placeholder="Quantity"
									required>
								<select id="" class="form-select" required>
									<option selected>Pcs</option>
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
								<input type="text" class="form-control" placeholder="Rp0">
							</div>
							<div class="d-flex align-items-center mx-2">
								<i class="las la-equals fs-22"></i>
							</div>
							<div>
								<input type="text" class="form-control" disabled placeholder="Rp0">
							</div>
							<div class="d-flex align-items-center mx-2">
								<BButton variant="link" class="p-1 rounded-circle"><i class="bx bxs-copy-alt fs-22"></i>
								</BButton>
							</div>
							<div class="d-flex align-items-center mx-2">
								<BButton variant="link" class="p-1 rounded-circle d-flex align-items-center bg-light"><i
										class="bx bx-x fs-22"></i></BButton>
							</div>
						</div>
					</BCol>
				</BRow>
				<BCol md="12">
					<div>
						<label for="">Subtotal </label>
						<input type="text" class="form-control" placeholder="Rp0" disabled>
					</div>
				</BCol>
			</BRow>
		</BForm>
		<div class="cta">

			<div class="d-flex justify-content-end mt-4">
				<BButton variant="light" class="me-2">Kembali</BButton>
				<BButton variant="dark">Simpan</BButton>
			</div>
		</div>
	</BModal>
</template>
