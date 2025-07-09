<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import { useReceiptStore } from '@/stores/receipt'
import { useReceiptItemStore } from '@/stores/receiptItem'
import type { Product } from '@/types/Product'
import type { ReceiptItem } from '@/types/ReceiptItem'
import { provide, watch } from 'vue'
import ConfirmCleardialog from './ConfirmCleardialog.vue'
import { onMounted, ref } from 'vue'
import { useMemberStore } from '@/stores/member'
import PromotionDialog from './PromotionDialog.vue'
import PaymentDialog from './PaymentDialog.vue'
import EditedMemberDialog from '../member/EditedMemberDialog.vue'
import ProductDialog from './ProductDialog.vue'
import { useSizeStore } from '@/stores/size'
import { useTypeStore } from '@/stores/types'

const content = ref(0)
const productStore = useProductStore()
const receiptItemStore = useReceiptItemStore()
const receiptStore = useReceiptStore()
const memberStore = useMemberStore()
const sizeStore = useSizeStore()
const typeStore = useTypeStore()

const dialog = ref(false)
const promotionDialog = ref(false)
const paymentDialog = ref(false)
const editedMemberDialog = ref(false)
const productDialog = ref(false)
const phone = ref()
const tab = ref(null)
const snackbar = ref(false)
const text = 'Please select product'

provide('clearDialog', dialog)
provide('promotionDialog', promotionDialog)
provide('paymentDialog', paymentDialog)
provide('editedMemberDialog', editedMemberDialog)
provide('productDialog', productDialog)

onMounted(async () => {
  await productStore.getProducts()
})

watch(content, function calContent() {})

function openPromotionDialog() {
  promotionDialog.value = true
}

async function findMember(item: string) {
  memberStore.getMemberByPhone(item)
}

function selectReceiptItem(p: Product) {
  productStore.editedProduct = JSON.parse(JSON.stringify(p))
  receiptItemStore.addProduct(p)
  receiptItemStore.addReceiptItem(receiptItemStore.receiptItem)
  receiptItemStore.clear()
}

function minus(item: ReceiptItem) {
  item.quantity -= 1
  const index = receiptItemStore.receiptItems.indexOf(item)
  item.total -= item.product.price
  if (item.quantity == 0) {
    receiptItemStore.receiptItems.splice(index, 1)
  }
  receiptStore.calTotal()
}

function plus(item: ReceiptItem) {
  item.quantity += 1
  item.total += item.product.price
  receiptStore.calTotal()
}

function remove(item: ReceiptItem) {
  const index = receiptItemStore.receiptItems.indexOf(item)
  receiptItemStore.receiptItems.splice(index, 1)
  receiptStore.calTotal()
}

function clearDialog() {
  if (!receiptItemStore.receiptItems[0]) {
    snackbar.value = true
  } else {
    dialog.value = true
  }
}

function openPaymentDialog() {
  if (!receiptItemStore.receiptItems[0]) {
    snackbar.value = true
  } else {
    paymentDialog.value = true
  }
}

function openMemberDialog() {
  editedMemberDialog.value = true
}

async function openProductDialog(p: Product) {
  await typeStore.getTypes()
  await sizeStore.getSizes()
  productStore.editedProduct = JSON.parse(JSON.stringify(p))
  productDialog.value = true
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col md="7">
        <v-card
          height="94vh"
          style="background-color: white; border-radius: 10px; overflow-y: auto"
          elevation="5"
        >
          <v-tabs v-model="tab" style="background-color: #0d1b2a; color: white">
            <v-tab value="one">Drinks</v-tab>
            <v-tab value="two">Foods</v-tab>
            <v-tab value="three">Desserts</v-tab>
          </v-tabs>

          <v-window v-model="tab">
            <v-window-item value="one">
              <v-container>
                <v-row>
                  <v-col
                    v-for="item of productStore.products.filter(
                      (product) => product.category === 'drink'
                    )"
                    :key="item.id"
                    md="4"
                  >
                    <v-card
                      elevation="5"
                      width="190"
                      height="230"
                      style="border-radius: 15px; background-color: #e1e5f2"
                    >
                      <v-img
                        :src="`http://localhost:3000/images/products/${item.image}`"
                        height="150"
                        width="190"
                        cover
                        style="pointer-events: none"
                      ></v-img>

                      <div style="text-align: center; margin-top: 3px; margin-bottom: 5px">
                        {{ item.name }}
                      </div>

                      <div style="display: flex; justify-content: center">
                        <v-btn
                          width="150"
                          style="border-radius: 20px"
                          color="#599c6a"
                          @click="openProductDialog(item)"
                          >Add</v-btn
                        >
                      </div>
                    </v-card>
                  </v-col>
                </v-row></v-container
              >
            </v-window-item>

            <v-window-item value="two">
              <v-container>
                <v-row>
                  <v-col
                    v-for="item of productStore.products.filter(
                      (product) => product.category === 'food'
                    )"
                    :key="item.id"
                    md="4"
                  >
                    <v-card
                      elevation="5"
                      width="160"
                      height="180"
                      style="border-radius: 15px; background-color: #e1e5f2"
                      @click="selectReceiptItem(item)"
                      ><v-img
                        :src="`http://localhost:3000/images/products/${item.image}`"
                        height="150"
                        width="160"
                        style="pointer-events: none"
                        cover
                      ></v-img>
                      <div style="text-align: center; margin-top: 3px">{{ item.name }}</div></v-card
                    >
                  </v-col>
                </v-row></v-container
              ></v-window-item
            >

            <v-window-item value="three">
              <v-container>
                <v-row>
                  <v-col
                    v-for="item of productStore.products.filter(
                      (product) => product.category === 'dessert'
                    )"
                    :key="item.id"
                    md="4"
                  >
                    <v-card
                      elevation="5"
                      width="160"
                      height="180"
                      style="border-radius: 15px; background-color: #e1e5f2"
                      @click="selectReceiptItem(item)"
                      ><div>
                        <v-img
                          :src="`http://localhost:3000/images/products/${item.image}`"
                          height="150"
                          width="160"
                          cover
                          style="pointer-events: none"
                        ></v-img>
                      </div>
                      <div style="text-align: center; margin-top: 3px">
                        {{ item.name }}
                      </div></v-card
                    >
                  </v-col>
                </v-row></v-container
              ></v-window-item
            >
          </v-window>
        </v-card>
      </v-col>

      <v-col md="5"
        ><v-card height="auto" elevation="5"
          ><v-table height="43vh" style="background-color: white" class="no-header-scroll">
            <thead style="background-color: #0d1b2a; color: white">
              <tr>
                <th>Name</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>

            <tbody style="background-color: white">
              <tr v-for="item in receiptItemStore.receiptItems" :key="item.id">
                <td>{{ item.product?.name }}</td>
                <td>{{ item.product?.price }}</td>
                <td style="width: 120px">
                  <v-row>
                    <v-btn
                      color="blue-grey-lighten-4
"
                      style="margin-right: 7px"
                      density="compact"
                      icon="mdi-minus"
                      @click="minus(item)"
                    ></v-btn>

                    {{ item.quantity
                    }}<v-btn
                      color="blue-grey-lighten-4
"
                      style="margin-left: 7px"
                      density="compact"
                      icon="mdi-plus"
                      @click="plus(item)"
                    ></v-btn>
                  </v-row>
                </td>

                <td>{{ item.total }}</td>
                <th>
                  <v-icon size="small" @click="remove(item)" color="#E57373"> mdi-delete </v-icon>
                </th>
              </tr>
            </tbody>
          </v-table></v-card
        >
        <div style="height: 24px"></div>

        <v-card elevation="5" height="14vh">
          <v-container>
            <v-row no-gutters>
              <v-col sm="10" md="5">
                <v-text-field
                  label="Search Member"
                  variant="solo"
                  v-model="phone"
                  append-inner-icon="mdi-magnify"
                  @click:append-inner="findMember(phone)"
                  @keyup.enter="findMember(phone)"
                  hide-details
                  single-line
                ></v-text-field>
              </v-col>
              <v-col sm="2" md="1"
                ><v-icon @click="openMemberDialog()" size="35" color="primary"
                  >mdi-account-multiple-plus</v-icon
                >
              </v-col>

              <v-col sm="8" md="4">
                <div style="height: 100%; text-align: center">
                  Name :
                  {{ memberStore.memberPhone.name }}
                  <div></div>
                  Point :
                  {{ memberStore.memberPhone.point }}
                </div>
              </v-col>
              <v-col sm="4" md="2"> <v-btn></v-btn></v-col>
            </v-row>
          </v-container>
        </v-card>
        <div style="height: 24px"></div>
        <v-card height="21vh" elevation="5">
          <v-container>
            <v-row>
              <v-col md="6" style="text-align: center">
                <v-badge color="error" content="9+">
                  <v-btn @click="openPromotionDialog()">promotion</v-btn>
                </v-badge>

                <div style="margin-top: 25px">No promotion has been used yet.</div>
              </v-col>
              <v-col md="6">
                <div style="padding: 20px 30px 0 30px">
                  <div style="display: flex; justify-content: space-between">
                    <div>Sub Total</div>
                    <div>{{ receiptStore.receipt.before_total }}</div>
                  </div>
                  <div style="display: flex; justify-content: space-between">
                    <div>Discount</div>
                    <div style="color: red">-{{ receiptStore.receipt.discount }}</div>
                  </div>
                  <div style="display: flex; justify-content: space-between">
                    <div>Total</div>
                    <div>{{ receiptStore.receipt.after_total }}</div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <div style="height: 24px"></div>
        <v-row>
          <v-col md="6">
            <v-btn
              width="100%"
              style="background-color: #fe6d73; color: white"
              @click="clearDialog()"
              >cancel
            </v-btn></v-col
          >
          <v-col md="6"
            ><v-btn width="100%" color="#599c6a" style="color: white" @click="openPaymentDialog()">
              Next</v-btn
            ></v-col
          >
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <ConfirmCleardialog></ConfirmCleardialog>

  <PromotionDialog></PromotionDialog>
  <PaymentDialog></PaymentDialog>
  <EditedMemberDialog></EditedMemberDialog>
  <ProductDialog></ProductDialog>

  <v-snackbar v-model="snackbar" multi-line :timeout="1500" color="white">
    {{ text }}

    <template v-slot:actions>
      <v-btn color="red" variant="text" @click="snackbar = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>
<style scoped></style>
