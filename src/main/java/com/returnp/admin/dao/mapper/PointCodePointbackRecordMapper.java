package com.returnp.admin.dao.mapper;

import com.returnp.admin.model.PointCodePointbackRecord;

public interface PointCodePointbackRecordMapper {
    int deleteByPrimaryKey(Integer pointCodePointbackRecordNo);

    int insert(PointCodePointbackRecord record);

    int insertSelective(PointCodePointbackRecord record);

    PointCodePointbackRecord selectByPrimaryKey(Integer pointCodePointbackRecordNo);

    int updateByPrimaryKeySelective(PointCodePointbackRecord record);

    int updateByPrimaryKey(PointCodePointbackRecord record);
}