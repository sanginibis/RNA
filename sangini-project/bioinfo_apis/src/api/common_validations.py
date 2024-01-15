class CommonValidations:

    # the request should have valid json
    def require_json(request):
        bReturn = True

        if not request.is_json:
            bReturn = False
        
        return bReturn

    # the request should have valid rna sequence

    def valid_rna_sequence(rna_sequence):
        bReturn = True

        # verify is rna_sequence has been provided
        if not rna_sequence:
            return False

        # verify the valid bases
        valid_bases = "ACGU"
        for base in rna_sequence:
            if base not in valid_bases:
                return False

        return bReturn