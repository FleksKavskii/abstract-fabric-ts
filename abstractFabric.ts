enum PizzaTypes {
    HAM= "HAM",
    PINEAPPLE = "PINEAPPLE"
}

class Log {
    outObject: {}

    private constructor() {}

    private static logger: Log

    static instance(): Log {
        if (!Log.logger) {
            Log.logger = new Log();
        }

        return Log.logger;
    }

    out(): void {
        console.log(this.outObject)
    }

    write(obj): void {
        this.outObject = {...obj}
    }
}

abstract class baseIngredient {
    abstract getIngredient(ingredient: string): string
}

class baseCheese extends baseIngredient {
    getIngredient(cheeseType: string): string {
        return cheeseType
    }
}

class mozzarellaCheese extends baseCheese {
    getIngredient(): string {
        return super.getIngredient('Mozzarella');
    }
}

class chedderCheese extends baseCheese {
    getIngredient(): string {
        return super.getIngredient('Chedder');
    }
}

class parmezanCheese extends baseCheese {
    getIngredient(): string {
        return super.getIngredient('Parmezan');
    }
}

class baseVeggie extends baseIngredient {
    getIngredient(veggieType: string): string {
        return veggieType
    }
}

class onionVeggie extends baseVeggie {
    getIngredient(): string {
        return super.getIngredient('Onions');
    }
}

class mushroomVeggie extends baseVeggie {
    getIngredient(): string {
        return super.getIngredient('Mushrooms');
    }
}

class tomatoVeggie extends baseVeggie {
    getIngredient(): string {
        return super.getIngredient('Tomatoes');
    }
}

class baseMainIngredient extends baseIngredient {
    getIngredient(mainIngredientType:string): string {
        return mainIngredientType
    }
}

class hamMainIngredient extends baseMainIngredient {
    getIngredient(): string {
        return super.getIngredient('Ham');
    }
}

class pineappleMainIngredient extends baseMainIngredient {
    getIngredient(): string {
        return super.getIngredient('Pineapple');
    }
}

abstract class abstractFabric {
    abstract createCheese(): any

    abstract createVeggie(): any

    abstract createMainIngredient(PizzaType: PizzaTypes): any
}

class MSCFabric extends abstractFabric {
    createCheese(): any {
        return new chedderCheese().getIngredient()
    }

    createVeggie(): any {
        return [new onionVeggie().getIngredient(), new mushroomVeggie().getIngredient()]
    }

    createMainIngredient(PizzaType: string): any {
        if (PizzaType === PizzaTypes.PINEAPPLE)
            return new pineappleMainIngredient().getIngredient()
        if (PizzaType === PizzaTypes.HAM)
            return new hamMainIngredient().getIngredient()
    }
}

class SPBFabric extends abstractFabric {
    createCheese(): any {
        return new parmezanCheese().getIngredient()
    }

    createVeggie(): any {
        return [new tomatoVeggie().getIngredient(), new mushroomVeggie().getIngredient()]
    }

    createMainIngredient(PizzaType: PizzaTypes): any {
        if (PizzaType === PizzaTypes.PINEAPPLE)
            return new pineappleMainIngredient().getIngredient()
        if (PizzaType === PizzaTypes.HAM)
            return new hamMainIngredient().getIngredient()
    }
}

abstract class Shop {
    abstract deliverPizza(PizzaType: PizzaTypes):object
}

class SPBShop extends Shop {
    deliverPizza(Pizza:PizzaTypes):any {
        let pizza:any = new SPBFabric()
        let PizzaType:any = Pizza

        let write = (PizzaType):void => Log.instance().write(returner(PizzaType))
        write(PizzaType)

        function returner(PizzaType:PizzaTypes):object{
            return {
                PizzaName: PizzaType + ' ' + 'Pizza',
                Cheese: pizza.createCheese(),
                Veggies: pizza.createVeggie(),
                MainIngredient: pizza.createMainIngredient(PizzaType)
            }}
    }
}

class MSCShop extends Shop {
    deliverPizza(Pizza:PizzaTypes):any {
        let pizza:any = new MSCFabric()
        let PizzaType:any = Pizza

        let write = (PizzaType):void => Log.instance().write(returner(PizzaType))
        write(PizzaType)

        function returner(PizzaType:PizzaTypes){
            return {
            PizzaName: PizzaType + ' ' + 'Pizza',
            Cheese: pizza.createCheese(),
            Veggies: pizza.createVeggie(),
            MainIngredient: pizza.createMainIngredient(PizzaType)
        }}
    }
}

function main() {
    let store = new SPBShop()
    let out = () => Log.instance().out()
    store.deliverPizza(PizzaTypes.HAM)
    out()
}
main()





