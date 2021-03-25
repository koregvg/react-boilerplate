import mockList from '@userConf/mockMap'
import Mock from 'mockjs'

export default ()=> {
    Object.keys(mockList).forEach(key => {
        if (mockList[key].enable) {
            let reg = new RegExp(key)
            Mock.mock(reg, mockList[key].data)
        }
    })
}