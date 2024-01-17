from tests.test_data import rna_test_data
from rna_data import codon_table_translator

class TranslateCodons:

    # method to get the translated output
    def translate(self, rna_codon_string):
        return (self._get_amino_acids(rna_codon_string,codon_table_translator))

    def _get_amino_acids(self, rna_codon_string, codon_table):
        
        """
        Processes an RNA codon string and returns a list of amino acid details.
        Args:
            rna_codon_string (str): The RNA codon string to process.
        Returns:
            list: A list of dictionaries, where each dictionary represents
                    an amino acid with its details (code, name, count, codons, positions).
        """

        next_amino_acid_id = 1
        amino_acid_details = []
        current_position = 0

        for i in range(0, len(rna_codon_string), 3):

            current_codon = rna_codon_string[i:i + 3]  # Extract the current codon
            amino_acid = codon_table.get(current_codon)  # Lookup amino acid in codon table

            if amino_acid:
                existing_index = next((index for index, aa in enumerate(amino_acid_details)
                                        if aa["code"] == amino_acid["code"]), -1)
                if existing_index != -1:
                    # Update existing entry
                    amino_acid_details[existing_index]["count"] += 1
                    amino_acid_details[existing_index]["positions"].append(current_position + 1)
                    amino_acid_details[existing_index]["codon"] += f", {current_codon}"  # Append codon
                else:
                    # Create new entry
                    amino_acid_details.append({
                        "id": next_amino_acid_id,
                        "code": amino_acid["code"],
                        "name": amino_acid["name"],
                        "count": 1,
                        "codon": current_codon,
                        "positions": [current_position + 1],
                    })
                    next_amino_acid_id += 1
            else:

                # Handle incomplete codons
                if len(current_codon) < 3:
                    amino_acid_details.append({
                        "id": next_amino_acid_id,
                        "code": "Incomplete",
                        "name": "Incomplete codon",
                        "count": 1,
                        "codon": current_codon,
                        "positions": [current_position + 1],
                    })
                    next_amino_acid_id += 1
            current_position += 3

        return amino_acid_details

# for self testing the class
if __name__ == '__main__':
    
    TC = TranslateCodons()

    print("")

    # test all the codon translator for the rna test data
    print("--------- Codon Translator ------------")
    for entry in rna_test_data:
        print(TC.translate(entry["RNASequence"]))
    print("")
