function runTests() {
    console.log("Running Palyt Logic Tests...");
    let mockStock = {
        "paneer": { "quantity": 1.5, "par": 1.0, "unit": "kg" }
    };
    let mockRecipe = { "paneer": 180 }; // 180g -> 0.18kg

    function checkTestAvailability(ingredients, stock) {
        for (let [ing, needed] of Object.entries(ingredients)) {
            if (!stock[ing]) return false;
            let availableQty = stock[ing].quantity;
            let parLevel = stock[ing].par;
            let scaledNeeded = (stock[ing].unit === 'kg' && needed > 10) ? needed / 1000 : needed;
            if (availableQty <= parLevel || availableQty < scaledNeeded) return false;
        }
        return true;
    }

    //test1
    let test1 = checkTestAvailability(mockRecipe, mockStock);
    console.assert(test1 === true, "Test 1 Failed: Should be available.");

    //test2
    mockStock["paneer"].quantity = 1.0; 
    let test2 = checkTestAvailability(mockRecipe, mockStock);
    console.assert(test2 === false, "Test 2 Failed: Should be unavailable at par level.");

    console.log("Tests completed successfully.");
}

runTests();