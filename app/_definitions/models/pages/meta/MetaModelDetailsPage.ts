import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormRockConfig } from "@ruiapp/rapid-extension";

const propertyFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: "auto",
      code: "code",
    },
    {
      type: "auto",
      code: "name",
    },
    {
      type: "textarea",
      code: "description",
    },
    {
      type: "auto",
      code: "required",
    },
  ],
};

const page: RapidPage = {
  code: "meta_model_details",
  parentCode: "meta_model_list",
  name: "实体模型详情",
  title: "实体模型详情",
  permissionCheck: { any: ["dev.manage"] },
  view: [
    {
      $type: "rapidEntityForm",
      entityCode: "Model",
      mode: "view",
      column: 3,
      items: [
        {
          type: "auto",
          code: "namespace",
        },
        {
          type: "auto",
          code: "name",
        },
        {
          type: "auto",
          code: "pluralCode",
        },
        {
          type: "auto",
          code: "singularCode",
        },
        {
          type: "auto",
          code: "description",
        },
      ],
      $exps: {
        entityId: "$rui.parseQuery().id",
      },
    },
    {
      $type: "antdTabs",
      items: [
        {
          key: "properties",
          label: "属性",
          children: [
            {
              $type: "sonicEntityList",
              entityCode: "Property",
              viewMode: "table",
              selectionMode: "none",
              pageSize: -1,
              fixedFilters: [
                {
                  field: "model_id",
                  operator: "eq",
                  value: "",
                },
              ],
              listActions: [
                {
                  $type: "sonicToolbarNewEntityButton",
                  text: "新建",
                  icon: "PlusOutlined",
                  actionStyle: "primary",
                },
                // {
                //   $type: "sonicToolbarRefreshButton",
                //   text: "刷新",
                //   icon: "ReloadOutlined",
                // },
              ],
              columns: [
                {
                  type: "auto",
                  code: "code",
                  width: "250px",
                },
                {
                  type: "auto",
                  code: "name",
                  width: "250px",
                },
                {
                  type: "auto",
                  code: "description",
                },
                {
                  type: "auto",
                  code: "type",
                  width: "150px",
                },
                {
                  type: "auto",
                  code: "columnName",
                  width: "150px",
                },
                {
                  type: "auto",
                  code: "required",
                  width: "150px",
                },
              ],
              actions: [
                {
                  $type: "sonicRecordActionEditEntity",
                  code: "edit",
                  actionType: "edit",
                  actionText: "修改",
                },
                {
                  $type: "sonicRecordActionDeleteEntity",
                  code: "delete",
                  actionType: "delete",
                  actionText: "删除",
                  dataSourceCode: "list",
                  entityCode: "Property",
                },
              ],
              newForm: cloneDeep(propertyFormConfig),
              editForm: cloneDeep(propertyFormConfig),
              $exps: {
                "fixedFilters[0].value": "$rui.parseQuery().id",
                "newForm.fixedFields.model_id": "$rui.parseQuery().id",
              },
            },
          ],
        },
      ],
    },
  ],
};

export default page;
