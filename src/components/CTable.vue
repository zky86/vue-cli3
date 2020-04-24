<template>
  <div class="c-table">
    <el-form ref="form" :model="form" v-if="fields.length > 0 || $slots.operate" inline>
      <template v-for="(field, index) in fields">
        <el-form-item
          :key="index"
          :label="field.label"
          :prop="field.prop"
          v-show="field.component !== 'hidden'"
          v-if="field.visible !== false"
        >
          <el-select v-if="field.component === 'select'" v-bind="field" v-model="form[field.prop]">
            <el-option v-for="option in field.options" :key="option.value" v-bind="option"></el-option>
          </el-select>
          <component
            v-else-if="field.component !== undefined"
            :is="typeof field.component === 'string' ? `el-${field.component}` : field.component"
            v-bind="field"
            v-model="form[field.prop]"
          ></component>
          <el-input v-else v-bind="field" v-model="form[field.prop]"></el-input>
        </el-form-item>
      </template>

      <template v-if="fields.length > 0 ">
        <el-form-item>
          <el-button icon="el-icon-search" @click="reload"></el-button>
          <el-button icon="el-icon-refresh" @click="resetFields"></el-button>
        </el-form-item>
      </template>

      <el-form-item class="operate">
        <slot name="operate"></slot>
      </el-form-item>
    </el-form>

    <template v-if="columns.length > 0 || !$scopedSlots.default">
      <el-table v-loading="loading" v-bind="$attrs" v-on="$listeners" :data="data">
        <template v-for="(column, index) in columns">
          <el-table-column
            v-if="column.slot === 'selection'"
            type="selection"
            width="55"
            :key="index"
          ></el-table-column>
          <slot v-else-if="column.slot" :name="column.slot"></slot>
          <component
            v-else-if="column.component"
            :is="column.component"
            :column="column"
            :key="index"
          ></component>
          <el-table-column v-else v-bind="column" :key="index">
            <template slot-scope="scope">
              {{
              column.filter
              ? column.filter(scope.row[column.prop])
              : scope.row[column.prop]
              }}
            </template>
          </el-table-column>
        </template>
      </el-table>
    </template>

    <div class="c-table__pagination" v-if="paging">
      <el-pagination
        background
        :layout="pagination.layout"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        :current-page.sync="pagination.currentPage"
        :total="pagination.total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import * as utils from '@/utils/index'
console.log(utils)
export default {
  name: 'c-table',
  props: {
    api: {
      type: Function
    },
    fields: {
      type: Array,
      default () {
        return []
      }
    },
    columns: {
      default () {
        return []
      }
    },
    paging: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      form: {},
      loading: false,
      data: [],
      pagination: {
        layout: this.$attrs.layout || 'total, sizes, prev, pager, next, jumper',
        total: 0,
        currentPage: 1,
        pageSize: +this.$attrs['page-size'] || 10,
        pageSizes: this.$attrs['page-sizes'] || [5, 10, 15, 20]
      }
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      this.loading = true
      const params = utils.cloneDeep(this.form)
      this.$emit('before-fetch', params)
      // console.log(params)
      this.api({
        ...params,
        pageSize: this.paging ? this.pagination.pageSize : undefined,
        pageIndex: this.paging ? this.pagination.currentPage : undefined
      }).then(res => {
        this.data = res.data.list
        if (this.paging) {
          this.$emit('after-fetch', res.data.list)
          this.pagination.total = res.data.total
          this.data = res.data.list
        } else {
          this.$emit('after-fetch', res.data.list)
          this.data = res.data.list
        }
        if (this.columns.length === 0) {
          this.$nextTick(() => {
            // const $container = this.$el.querySelector('.el-row')
          })
        } else {
          this.loading = false
        }
      })
    },
    reload () {
      this.pagination.currentPage = 1
      this.fetch()
    },
    resetFields () {
      this.$refs.form.resetFields()
      this.reload()
    },
    onSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.pagination.currentPage = 1
      this.fetch()
    },
    onCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetch()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
.c-table__pagination{
  margin-top: 20px;
}
@include b(c-table) {
  background: #fff;
  // padding: $padding;
  > .el-form {
    &::after {
      content: ' ';
      display: block;
      clear: both;
    }
    .operate {
      float: right;
      margin-right: 0;
    }
    .el-input,
    .el-select {
      width: 200px;
    }
  }
  .el-table {
    font-size: 14px;
    .el-button--text {
      font-size: 14px;
    }
    .cell {
      line-height: initial;
    }
    .el-button--text {
      padding: 0;
    }
  }
  @include e(masonry) {
    .el-col {
      margin-bottom: 16px;
      .el-card__body {
        padding: 0;
      }
    }
  }

  @include e(pagination) {
    text-align: right;
    .el-pagination {
      padding: 10px;
      .el-select .el-input .el-input__inner {
        border-radius: 4px;
      }
      &.is-background .btn-next,
      .btn-prev,
      .el-pager li {
        background: #fff;
        border: 1px solid $color-border;
        border-radius: 4px;
      }
      &.is-background .el-pager li:not(.disabled).active {
        border: 1px solid $color-theme;
      }
    }
  }
}
</style>
