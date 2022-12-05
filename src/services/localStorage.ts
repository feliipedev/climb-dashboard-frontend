const get = (name: string, parse?: boolean): any => {
   try {
      const storageValue = localStorage.getItem(name)

      if (storageValue !== null) {
         if (parse) {
            const parsed = JSON.parse(storageValue)
            return parsed
         }
         return storageValue
      }
      return undefined
   } catch (error) {
      console.warn('Error while retrieving data', error)
   }
   return undefined
}

const set = <T = any>(name: string, data: T, parse?: boolean): void => {
   try {
      const value = parse ? JSON.stringify(data) : String(data)

      localStorage.setItem(name, value)
   } catch (error) {
      console.warn('Error while storing data:', error)
   }
}

const merge = <T>(name: string, data: T): T => {
   try {
      const oldData = get(name)

      if (oldData) {
         const parsed = JSON.parse(oldData)
         const merged = { ...parsed, ...data }
         set(name, merged)

         return merged
      }

      return data
   } catch (error) {
      console.warn('Error while merging data:', error)
   }
   return data
}

const remove = (name: string): void => {
   try {
      localStorage.removeItem(name)
   } catch (error) {
      console.warn('Error while removing data:', error)
   }
}

const clear = (): void => {
   try {
      localStorage.clear()
   } catch (error) {
      console.warn('Error while clearing data:', error)
   }
}

const fns = {
   get,
   set,
   merge,
   remove,
   clear,
}

export default fns
