from flask import Flask, jsonify, request
from api.test_server import TestServer
from api.gc_calculations import GCCalculations
from api.codon_bias import CodonBiasAnalyzer
from api.nussinov_predicted_structure import NussinovPredictedStructure
from api.zuker_predicted_structure import ZukerPredictedStructure
from api.common_validations import CommonValidations
from api.translate_codons import TranslateCodons

app = Flask(__name__)


# gets the bioinfo for the rna sequence
@app.route('/bioinfo', methods=['POST'])
def bio_info_calculations():
    
    CD =  CommonValidations

    if not CD.require_json(request):
        return jsonify(
            {
                'error_code': 201,
                'error_message': 'The request should be in json format',
            }
        ), 400

    data = request.get_json()
    rna_sequence = data.get('rna_sequence')

    if not CD.valid_rna_sequence(rna_sequence):
        return jsonify(
            {
                'error_code': 202,
                'error_message': 'The RNA sequence provided is not valid.',
            }
        ), 400


    # get the gc related info
    bio_info_details = []
    GCC = GCCalculations()

    gc_fraction = GCC.get_gc_fraction(rna_sequence)
    bio_info_details.append({
        "name": "G+C Fraction",
        "data": gc_fraction
    })

    gc_123 = GCC.get_gc_content_for_123(rna_sequence)
    bio_info_details.append({
        "name": "G+C Total",
        "data": gc_123[0]
    })
    bio_info_details.append({
        "name": "G+C First",
        "data": gc_123[1]
    })
    bio_info_details.append({
        "name": "G+C Second",
        "data": gc_123[2]
    })
    bio_info_details.append({
        "name": "G+C Third",
        "data": gc_123[3]
    })


    mw = GCC.get_gc_molecular_weight(rna_sequence)
    bio_info_details.append({
        "name": "Molecular Weight",
        "data": mw
    })


    # get the codon bias related info
    CBA = CodonBiasAnalyzer()
    cba_values = CBA.analyze_codon_bias(rna_sequence)

    # get the translated codon oputput
    TC = TranslateCodons()
    tc_values = TC.translate(rna_sequence)

    return jsonify(
        {
            'bio_info_details' : bio_info_details,
            'translated_codons': tc_values
        }
    ), 200


@app.route('/nussinov', methods=['POST'])
def nussinov_structure():

    CD = CommonValidations

    if not CD.require_json(request):
        return jsonify(
            {
                'error_code': 201,
                'error_message': 'The request should be in json format',
            }
        ), 400

    data = request.get_json()
    rna_sequence = data.get('rna_sequence')

    if not CD.valid_rna_sequence(rna_sequence):
        return jsonify(
            {
                'error_code': 202,
                'error_message': 'The RNA sequence provided is not valid.',
            }
        ), 400

    NPS = NussinovPredictedStructure()
    res = NPS.get_predicted_structure(rna_sequence)

    return jsonify(
        {
            'nussinov': res,
        }
    ), 200


@app.route('/zuker', methods=['POST'])
def zuker_structure():

    CD = CommonValidations

    if not CD.require_json(request):
        return jsonify(
            {
                'error_code': 201,
                'error_message': 'The request should be in json format',
            }
        ), 400

    data = request.get_json()
    rna_sequence = data.get('rna_sequence')

    if not CD.valid_rna_sequence(rna_sequence):
        return jsonify(
            {
                'error_code': 202,
                'error_message': 'The RNA sequence provided is not valid.',
            }
        ), 400

    ZPS = ZukerPredictedStructure()
    res = ZPS.get_predicted_structure(rna_sequence)

    return jsonify(
        {
            'zuker': res,
        }
    ), 200

# gets the server status
@app.route('/status', methods=['GET'])
def server_status():
    tsr = TestServer()
    return jsonify(tsr.get_current_datetime())


if __name__ == '__main__':
   app.run(port=5000)