<template>
	<view>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="searchText" auto-focus type="text" @input="search" placeholder="请输入股票名称或代码"
				 confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round" @tap="back">取消</button>
			</view>
		</view>
		<view v-for="item in searchData" :key="item.stock_id" class="d-flex justify-around py-2" @click="detail(item.code)">
			<view>{{item.code}}</view>
			<view>{{item.name}}</view>
			<view>{{item.ind_name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchText:'',
				searchData:[]
			}
		},
		methods: {
			async search(){
				if(this.searchText !=''){
					let searchData = await this.$api.search(this.searchText);
					//过滤沪深的股票
					let filterData = searchData.data.stocks.filter((value)=>{
						return value.ind_name !='' && (value.code.indexOf('SH')!=-1 || value.code.indexOf('SZ')!=-1);
					})
					this.searchData = filterData;
				}
			},
			back(){
				uni.navigateBack();
			},
			detail(symbol){
				uni.navigateTo({
					url:`../detail/detail?symbol=${symbol}`
				})
			}
		}
	}
</script>

<style>
	.justify-around + .justify-around{
		border-top: 1upx solid #007BFF;
	}

</style>
