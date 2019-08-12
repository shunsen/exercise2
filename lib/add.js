function add(a, b) {
  // 实现该函数
  let safeLen = Number.MAX_SAFE_INTEGER.toString().length - 1 //减1是为了防止进位导致超出安全范围
  //将大数安全分割并保存为数组
  function splitNumber(num) {
    let arr = []
    let numStr = num.toString()
    let start = 0
    let end = 0
    // 大数字符串分成的段数
    times = Math.ceil(numStr.length / safeLen)
    for (let i = 0; i < times; i++) {
      if (i === 0) {
        end = numStr.length % safeLen
      } else {
        end = start + safeLen
      }
      arr.push(numStr.substring(start,end))
      start = end
    }
    return arr
  }

  let arr_a = splitNumber(a)
  let arr_b = splitNumber(b)
  let longArr = null
  let shortArr = null

  if (arr_a.length > arr_b.length) {
    longArr = arr_a
    shortArr = arr_b
  } else {
    longArr = arr_b
    shortArr = arr_a
  }

  let carry = 0
  for (let j = 0; j < shortArr.length; j++) {
    let k = shortArr.length - j - 1
    let sum = parseInt(longArr[k]) + parseInt(shortArr[k])
    // 要进位
    if (sum.toString().length > safeLen) {
      longArr[k] = sum - Math.pow(10, safeLen) + carry
      carry = 1
      if (shortArr.length === j + 1) {
        longArr[longArr.length - shortArr.length - 1] = (parseInt(longArr[longArr.length - shortArr.length - 1]) + 1).toString()
      }
    } else {
      // 不用进位
      longArr[k] = sum + carry
      carry = 0
    }
  }
  let res = longArr.join('')
  return res
}

module.exports = add
