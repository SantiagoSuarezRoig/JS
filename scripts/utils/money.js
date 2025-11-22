export const formatCurrency = {
    change(price){
        return (Math.round(price)/100).toFixed(2)
    }
}
