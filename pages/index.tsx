import { Flex, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, NumberDecrementStepper, Box, Input, Text } from '@chakra-ui/react'
import { format, isDate, parse, differenceInDays } from 'date-fns';
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask';

interface User {
  name: string,
  points: number,
}


const Home: NextPage = () => {
  const [sales, setSales] = useState([{
    index: 1,
    date: format(new Date(), 'dd/MM/yyyy'),
    value: 0,
  }])

  const [consolidatedDiferenceInDays, setDiferenceInDays] = useState(0)
  const [monthlyTax, setMonthlyTax] = useState(2)
  const [tax, setTax] = useState(3)
  const [dailyTax, setDailyTax] = useState(monthlyTax / 30)
  const [finalValue, setFinalValue] = useState((sales[0].value * tax / 100) + sales[0].value + (sales[0].value * dailyTax / 100 * 30))

  useEffect(() => {
    setDailyTax(monthlyTax / 30)
  }, [monthlyTax])

  useEffect(() => {
    const [currentSale] = sales;
    const { value } = currentSale;
    const tempTax = value * (tax / 100);
    const tempTaxByDay = consolidatedDiferenceInDays * dailyTax / 100 * Number(value);
    setFinalValue(Number(value) + tempTaxByDay + tempTax)
    console.log(consolidatedDiferenceInDays * dailyTax, Number(value));


    // setFinalValue()
  }, [consolidatedDiferenceInDays, dailyTax, sales, tax, monthlyTax])

  const onValueChange = (value: string, passIndex: number, key: string) => {

    setSales(sales.map((element, index) => {
      if (index === passIndex) {

        return {
          ...element,
          [key]: value,
        }
      }
      return element
    }))
    if (key === 'date')
      setDiferenceInDays(differenceInDays(new Date(), parse(value, 'dd/MM/yyyy', new Date())))
  }

  return (
    <Flex direction="column" justify="center" alignItems="center">
      <Flex gridGap="3" align="center" mt={"12"} direction="column">
        <Flex direction={"column"} alignItems={"center"}>
          <Text my={2}>Multa </Text>
          <NumberInput defaultValue={tax} precision={2} step={0.2} onChange={(value) => setTax(Number(value))}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>

        <Flex direction={"column"} alignItems={"center"}>
          <Text my={2}>Juros mensal </Text>
          <NumberInput defaultValue={monthlyTax} precision={2} step={0.2} onChange={value => setMonthlyTax(Number(value))}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
        <Box>
          <Text textAlign="center" my="5" fontSize={20}>
            Compras
          </Text>
          <Box>
            {sales.map((element, index) =>
              <Flex key={element.index} align="center" direction="column" gridGap="5" border="1px solid white" p="4" borderRadius={10}>
                <Text textAlign="center">
                  Data da compra
                </Text>
                {/* <Input as={InputMask} mask="******" value={parse(sales[0].date, 'DD/MM/YYYY', new Date())} /> */}
                <Input as={InputMask} mask="**/**/****" value={sales[0].date} onChange={(value) => onValueChange(value.target.value, 0, 'date')} />
                <Flex direction="column">
                  {/* <DatePicker selected={element.date} onChange={(date) => setSales(sales.map(element => {

                    }
                    })  /> */}
                  <NumberInput defaultValue={sales[0].value} precision={2} step={0.2} onChange={value => onValueChange(value, 0, 'value')}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
              </Flex>
            )}
          </Box>
        </Box>
        <Text textAlign={"center"} mt={5} fontSize={24} fontWeight={"500"}>
          Valor final com juros e multa: {finalValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
        </Text>
      </Flex >
    </Flex >
  )
}

export default Home
