// src/utils/enums.js

/**
 * Converts a rotation type number to a string.
 * @param {number} rotationType - The rotation type (1, 2, 3).
 * @returns {string} - The string representation of the rotation type.
 */
export const rotationTypeEnum = (rotationType) => {
	switch (rotationType) {
		case 1:
			return 'Daily'
		case 2:
			return 'Weekly'
		case 3:
			return 'Monthly'
		default:
			return 'Unknown'
	}
}

/**
 * Converts a payment mode number to a string.
 * @param {number} paymentMode - The payment mode (1, 2, 3).
 * @returns {string} - The string representation of the payment mode.
 */
export const paymentModeEnum = (paymentMode) => {
	switch (paymentMode) {
		case 1:
			return 'Cash'
		case 2:
			return 'Transfer'
		case 3:
			return 'Check'
		default:
			return 'Unknown'
	}
}

/**
 * Converts a transaction status number to a string.
 * @param {number} transactionStatus - The transaction status (1, 2, 3).
 * @returns {string} - The string representation of the transaction status.
 */
export const transactionStatusEnum = (transactionStatus) => {
	switch (transactionStatus) {
		case 1:
			return 'Approved'
		case 2:
			return 'Pending'
		case 3:
			return 'Rejected'
		default:
			return 'Unknown'
	}
}