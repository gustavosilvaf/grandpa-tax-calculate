import { Badge, Button, Flex } from "@chakra-ui/react"
import { differenceInDays, differenceInHours, differenceInMilliseconds, differenceInMinutes, getHours, parse } from "date-fns"
import eachHourOfIntervalWithOptions from "date-fns/esm/fp/eachHourOfIntervalWithOptions/index"
import { useEffect, useState } from "react"

interface MODEL_HOURS_PROPS {
    e1: string,
    e2: string,
    e3: string,
    e4: string
}

const Hour = () => {
    const MODEL_HOURS = {
        e1: '08:00',
        e2: '12:00',
        e3: '13:00',
        e4: '17:00',
    }

    const [hours, setHours] = useState([MODEL_HOURS])
    const [differences, setDifferences] = useState<any>([]);


    useEffect(() => {
        setDifferences(hours.map((times, index) => {
            const convertedHours = {
                e1: parse(times.e1, "HH:mm", new Date()),
                e2: parse(times.e2, "HH:mm", new Date()),
                e3: parse(times.e3, "HH:mm", new Date()),
                e4: parse(times.e4, "HH:mm", new Date())
            }

            if (convertedHours.e2.getHours() !== 0) {
                const firstDifference = differenceInMilliseconds(convertedHours.e2, convertedHours.e1)
                const secondDifference = differenceInMilliseconds(convertedHours.e4, convertedHours.e3)
                const diff = new Date(firstDifference + secondDifference);
                const saldo = new Date(firstDifference + secondDifference - 18000000);

                let saldoInHours = saldo.getHours() < 6 ? saldo.getHours() : `- ${24 - saldo.getHours()}`


                return {
                    ...differences[index],
                    saldo: `${saldoInHours}:${saldo.getMinutes()}`,
                    total: `${diff.getHours() + 3}:${diff.getMinutes()}`
                }
            }

            const diff = new Date(differenceInMilliseconds(convertedHours.e4, convertedHours.e1))

            let saldo = new Date(differenceInMilliseconds(convertedHours.e4, convertedHours.e1) - 18000000);

            let saldoInHours = saldo.getHours() < 6 ? saldo.getHours() : `- ${24 - saldo.getHours()}`


            return {
                ...differences[index],
                saldo: `${saldo.getHours()}:${saldo.getMinutes()}`,
                total: `${diff.getHours() + 3}:${diff.getMinutes()}`
            }

        }))
    }, [hours])



    const setHour = (newValue: string, index: number, key: string) => {
        setHours(hours.map((element, mapIndex) => {
            if (index === mapIndex) {
                return {
                    ...hours[index],
                    [key]: newValue
                }
            }
            return element
        }))
    }

    const removeValue = (index: number) => {
        setHours(hours.filter((element, filterIndex) => {
            return index !== filterIndex
        }))
    }

    const addValues = () => {
        setHours([...hours, MODEL_HOURS])
    }

    console.log();




    return (
        <Flex margin="auto" justify="center" mt="5" fontSize={30} fontWeight="bold" direction={'column'} alignItems='center'>
            <Flex gridGap={10}>
                Calculo de horas
                <Button colorScheme={"red"} onClick={() => setHours([MODEL_HOURS])}>Reset </Button>
            </Flex>


            {hours.map((element, index) => {
                return (
                    <Flex gridGap={10} align="center" mt="5" color={"black"} key={`index-${index}`}>
                        <input type="time" style={{ fontSize: '16px', padding: '0.5em 1em' }} value={element.e1} onChange={(event) => setHour(event.target.value, index, 'e1')} />
                        <input type="time" style={{ fontSize: '16px', padding: '0.5em 1em' }} value={element.e2} onChange={(event) => setHour(event.target.value, index, 'e2')} />
                        <input type="time" style={{ fontSize: '16px', padding: '0.5em 1em' }} value={element.e3} onChange={(event) => setHour(event.target.value, index, 'e3')} />
                        <input type="time" style={{ fontSize: '16px', padding: '0.5em 1em' }} value={element.e4} onChange={(event) => setHour(event.target.value, index, 'e4')} />
                        <Button colorScheme={"pink"} size="lg" onClick={() => addValues()} onAuxClick={() => removeValue(index)}>Add </Button>
                        <Badge disabled colorScheme={"blue"} p="0.5rem 1rem" fontSize={20} variant="outline" borderRadius={5}>Total : {differences[index]?.total ?? ""}</Badge>
                        <Badge disabled colorScheme={String(differences[0]?.saldo).includes('-') ? 'red' : 'green'} p="0.5rem 1rem" fontSize={20} variant="outline" borderRadius={5}>Diferença : {differences[index]?.saldo ?? ''}</Badge>
                    </Flex>
                )
            })}


        </Flex >
    )
}

export default Hour