import React, { Component } from 'react';
import { LayoutAnimation, Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common/CardSection';
import * as actions from '../actions';

class ListItem extends Component {

    renderDescription() {
        const { library, expanded } = this.props;
        
        if (expanded) {
            return (
                <CardSection>
                    <Text style={{ flex: 1 }}>{library.item.description}</Text>
                </CardSection>
            );
        }
    }

    render() {
        const { titleStyle } = styles;
        const { id, title } = this.props.library.item;

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.props.selectLibrary(id);
                    LayoutAnimation.spring();
                }}
            >
                <View style={{ overflow: 'hidden' }}>
                    <CardSection>
                        <Text style={titleStyle}>{title}</Text>
                    </CardSection>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
};

const mapStateToProps = (state, ownProps) => {
    const expanded = state.selectedLibraryId === ownProps.library.item.id;

    return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem);
