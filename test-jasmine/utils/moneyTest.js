import { formatCurrency } from '../../scripts/utils/money.js'


describe('test suite: formatCurrency',()=>{
    it('convert cents into dollars',()=>{
        expect(formatCurrency.change(2000)).toEqual('20.00')
    })

    it('works with 0',()=>{
        expect(formatCurrency.change(0)).toEqual('0.00')
    })

    it('rounds up to the nearest cent',()=>{
        expect(formatCurrency.change(2000.5)).toEqual('20.01')
    })
})
