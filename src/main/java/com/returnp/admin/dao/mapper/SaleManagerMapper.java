package com.returnp.admin.dao.mapper;

import com.returnp.admin.model.SaleManager;

public interface SaleManagerMapper {
    int deleteByPrimaryKey(Integer saleManagerNo);

    int insert(SaleManager record);

    int insertSelective(SaleManager record);

    SaleManager selectByPrimaryKey(Integer saleManagerNo);

    int updateByPrimaryKeySelective(SaleManager record);

    int updateByPrimaryKey(SaleManager record);
}