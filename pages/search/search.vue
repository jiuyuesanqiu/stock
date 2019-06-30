<template>
	<view>
		<view class="cu-bar search bg-white fixed">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="searchText" auto-focus type="text" @input="search" placeholder="请输入股票名称或代码"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round" @tap="back">取消</button>
			</view>
		</view>
		<view class="px-5" style="padding-top: 100upx;">
			<view class="flex bb text-center py-2">
				<view style="width: 33.3%;">
					代码
				</view>
				<view style="width: 33.3%;">
					名称
				</view>
				<view style="width: 33.3%;">
					行业
				</view>
			</view>
			<view class="flex bb text-center py-2" v-for="item in searchData" :key="item.stock_id" @click="detail(item.code)">
				<view style="width: 33.3%;">
					{{item.code}}
				</view>
				<view style="width: 33.3%;">
					{{item.name}}
				</view>
				<view style="width: 33.3%;">
					{{item.ind_name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchText: '',
				searchData: [],
				show:false
			}
		},
		methods: {
			async search() {
				console.log(123)
				if (this.searchText != '') {
					let searchData = await this.$api.search(this.searchText);
					//过滤沪深的股票
					let filterData = searchData.data.stocks.filter((value) => {
						console.log(value)
						return value.ind_name != '' && (value.code.indexOf('SH') != -1 || value.code.indexOf('SZ') != -1);
					})
					this.searchData = filterData;
				}
			},
			back() {
				uni.navigateBack();
			},
			detail(symbol) {
				uni.navigateTo({
					url: `../detail/detail?symbol=${symbol}`
				})
			}
		}
	}
</script>

<style>
	.justify-around+.justify-around {
		border-top: 1upx solid #007BFF;
	}
</style>
