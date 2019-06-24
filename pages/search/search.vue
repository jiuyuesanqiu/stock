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
		<view v-for="item in searchData" :key="item.stock_id">
			<view>{{item.code}}</view>
			<view>{{item.name}}</view>
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
					//过滤掉不是沪深的股票
				
					this.searchData = searchData.data.stocks;
				}
			},
			back(){
				uni.navigateBack();
			}
		}
	}
</script>

<style>

</style>
