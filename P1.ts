// 2025/10/31
// Implemented by Aiden Li

type ScrollResult = {
    internalIndex: number;
    needsJump: boolean;
    jumpToIndex?: number;
};

/**
 * @param banners - an array of strings representing the real banners (length ≥ 2)
 * @param scroll - an integer representing how many times the user has scrolled right (0 <= scroll <= 100)
 * @returns the internal index in the augmented list, and jump behavior if on a cloned item
 */
function simulateScroll(banners: string[], scroll: number): ScrollResult {
    const n = banners.length;

    
    
    //  If the result is on a cloned item, a jump is required:
    //     x If the index is 0 → jump to n (Scroll Right, not gonna happen, dont care)
    //     If the index is n + 1 → jump to 1 (first real item)

    // Therefore, jump only occur in n + 1, which is when wrapped with scroll >= n

    // case 1: no wrap
    if (scroll < n) {
        // internalIndex start in 1
        const internalIndex = scroll + 1
        return { internalIndex: internalIndex, needsJump: false };
    }

    // case 2: wrap, need modulo to handle
    const modIndex = scroll % n

    // case 2.1: jump only occur in internalIndex n + 1. on cloned, which is the first real item of the banners 
    if (modIndex === 0) {
        return { internalIndex: n + 1, needsJump: true, jumpToIndex: 1 };
    }

    // case 2.2: if no jump, than must not be the first real item.
    return { internalIndex: modIndex + 1, needsJump: false };




}

// simulateScroll(["A", "B", "C"], 0);
// { internalIndex: 1, needsJump: false }

// simulateScroll(["A", "B", "C"], 3);
// { internalIndex: 4, needsJump: true, jumpToIndex: 1 }

// simulateScroll(["A", "B", "C"], 4); 
// { internalIndex: 2, needsJump: false } 
// console.log("-----------TEST TEST------------")
// console.log(simulateScroll(["A", "B", "C"], 0))
// console.log(simulateScroll(["A", "B", "C"], 3))
// console.log(simulateScroll(["A", "B", "C"], 4))
// console.log(simulateScroll(["A", "B", "C"], 6))
// console.log(simulateScroll(["A", "B", "C"], 11))