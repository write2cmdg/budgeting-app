
//Helper imports
import { deleteItem, getAllMatchingItems } from "../helpers"

//Libraby imports
import { toast } from "react-toastify"

//rrd imports
import { redirect } from "react-router-dom";


export function deleteBudget({params}) {
    try {
        deleteItem({
            key: "budgets",
            id: params.id,
        })

        const associatedExpenses = getAllMatchingItems({
            category: 'expenses',
            key: "budgetId",
            value: params.id,
        })

        associatedExpenses.forEach(expense => {
            deleteItem({
                key: "expenses",
                id: expense.id
            })
        });
        toast.success("Budget Deleted successfully!")
    } catch (error) {
        throw new Error("There was a problem deleting the budget")
    }
    return redirect("/")
}

export default deleteBudget